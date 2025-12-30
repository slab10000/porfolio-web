import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

// Main component with pure Three.js implementation
const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/210ac13a-efc3-4445-b02d-78097bfae470',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LiquidGlassCard.tsx:component',message:'LiquidGlassCard component mounted',data:{hasTHREE:typeof THREE !== 'undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    setHasWebGL(!!gl);
  }, []);

  // Detect device capabilities for quality adjustment
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024 && window.innerWidth >= 768;
    const pixelRatio = window.devicePixelRatio || 1;
    
    if (isMobile || pixelRatio > 2) {
      setQuality('low');
    } else if (isTablet) {
      setQuality('medium');
    } else {
      setQuality('high');
    }
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024 && window.innerWidth >= 768;
      if (isMobile) {
        setQuality('low');
      } else if (isTablet) {
        setQuality('medium');
      } else {
        setQuality('high');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth hover animation
  useEffect(() => {
    let animationFrame: number;
    const targetHover = isHovered ? 1 : 0;
    
    const animate = () => {
      setHoverProgress((prev) => {
        const diff = targetHover - prev;
        if (Math.abs(diff) < 0.01) return targetHover;
        return prev + diff * 0.1;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  // Create shader material
  const createShaderMaterial = useCallback(() => {
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uDistortion;
      uniform float uHover;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      float fresnel(vec3 viewDir, vec3 normal, float power) {
        return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
      }

      void main() {
        vec2 uv = vUv;
        
        vec2 liquidUV = vPosition.xy * 0.15 + uTime * 0.3;
        float liquidDistortion = fbm(liquidUV) - 0.5;
        uv += liquidDistortion * uDistortion * 0.015 * (1.0 + uHover * 0.5);
        
        vec2 mouseUV = (uMouse + 1.0) * 0.5;
        float mouseDist = distance(uv, mouseUV);
        float highlight = 1.0 - smoothstep(0.0, 0.4, mouseDist);
        highlight = pow(highlight, 2.0) * (0.4 + uHover * 0.3);
        
        vec3 viewDir = normalize(vViewPosition);
        float fresnelFactor = fresnel(viewDir, vNormal, 2.5);
        fresnelFactor = pow(fresnelFactor, 1.2);
        
        float chromaAmount = fresnelFactor * 0.01;
        vec3 glassColor = vec3(1.0);
        
        float rShift = highlight * (1.0 + chromaAmount);
        float gShift = highlight;
        float bShift = highlight * (1.0 - chromaAmount);
        glassColor += vec3(rShift, gShift, bShift) * 0.6;
        
        vec3 fresnelColor = vec3(1.0, 1.0, 1.0) * fresnelFactor * 0.8;
        glassColor += fresnelColor;
        
        glassColor = mix(glassColor, vec3(0.98, 0.99, 1.0), fresnelFactor * 0.2);
        
        float baseAlpha = 0.01;
        float alpha = baseAlpha + fresnelFactor * 0.02 + highlight * 0.01;
        alpha += uHover * 0.01;
        alpha = clamp(alpha, 0.0, 0.05);
        
        gl_FragColor = vec4(glassColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDistortion: { value: 1.0 },
        uHover: { value: 0.0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!hasWebGL || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera (orthographic for 2D effect)
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: quality !== 'low',
      powerPreference: quality === 'high' ? 'high-performance' : 'default',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(quality === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    rendererRef.current = renderer;

    // Create material
    const material = createShaderMaterial();
    materialRef.current = material;

    // Create geometry
    const segments = quality === 'high' ? 64 : quality === 'medium' ? 32 : 16;
    const geometry = new THREE.PlaneGeometry(2, 2, segments, segments);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Animation loop
    const animate = () => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      timeRef.current += 0.01;
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
      materialRef.current.uniforms.uHover.value = hoverProgress;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [hasWebGL, quality, mouse, hoverProgress, createShaderMaterial]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    if (quality === 'low' && animationFrameRef.current) {
      return; // Throttle on low quality
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMouse({ x, y });
  }, [quality]);

  // Error boundary - if Three.js failed to load, use CSS fallback
  useEffect(() => {
    if (!hasWebGL || !THREE) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/210ac13a-efc3-4445-b02d-78097bfae470',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LiquidGlassCard.tsx:fallback',message:'Using CSS fallback',data:{hasWebGL,hasTHREE:!!THREE},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    }
  }, [hasWebGL]);

  if (!hasWebGL || !THREE) {
    return (
      <div
        ref={containerRef}
        className={`liquid-glass-fallback ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`liquid-glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouse({ x: 0, y: 0 });
      }}
    >
      <div className="liquid-glass-content">{children}</div>
      <div className="liquid-glass-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

// Export component directly (error handling is built into the component)
export default LiquidGlassCard;
