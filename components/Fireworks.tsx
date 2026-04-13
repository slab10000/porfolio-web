import React, { useEffect, useRef } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	color: string;
	size: number;
	decay: number;
	life: number;
}

interface TextParticle {
	x: number;
	y: number;
	tx: number;
	ty: number;
	vx: number;
	vy: number;
	color: string;
	size: number;
	life: number;
	progress: number;
}

interface Rocket {
	x: number;
	y: number;
	vy: number;
	targetY: number;
	color: string;
	exploded: boolean;
	trail: { x: number; y: number; alpha: number }[];
	isTextRocket?: boolean;
}

const COLORS = [
	"#d6fe51",
	"#ff6b6b",
	"#ffd700",
	"#ff69b4",
	"#00bfff",
	"#ff4500",
	"#7fff00",
	"#ff1493",
	"#ffa500",
	"#00ff7f",
	"#ff0aff",
	"#33dccf",
];

const TEXT_COLORS = ["#d6fe51", "#ffd700", "#ff6b6b", "#00bfff", "#ff69b4"];

function sampleTextPixels(
	lines: string[],
	maxWidth: number,
	centerX: number,
	centerY: number
): { x: number; y: number }[] {
	const offscreen = document.createElement("canvas");
	// Size font to fit the longest line within maxWidth
	const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), "");
	const maxFontSize = 100;
	const fontSize = Math.min(Math.floor(maxWidth / (longestLine.length * 0.52)), maxFontSize);
	const lineHeight = fontSize * 1.25;
	const totalTextHeight = lineHeight * lines.length;

	offscreen.width = Math.ceil(maxWidth);
	offscreen.height = Math.ceil(totalTextHeight + fontSize);
	const octx = offscreen.getContext("2d")!;

	octx.fillStyle = "white";
	octx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
	octx.textAlign = "center";
	octx.textBaseline = "middle";

	// Draw each line centered
	for (let i = 0; i < lines.length; i++) {
		const lineY = offscreen.height / 2 + (i - (lines.length - 1) / 2) * lineHeight;
		octx.fillText(lines[i], offscreen.width / 2, lineY);
	}

	const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
	const points: { x: number; y: number }[] = [];

	// Dense sampling for crisp readable text
	const step = Math.max(2, Math.floor(fontSize / 32));
	for (let y = 0; y < offscreen.height; y += step) {
		for (let x = 0; x < offscreen.width; x += step) {
			const idx = (y * offscreen.width + x) * 4;
			if (imageData.data[idx + 3] > 128) {
				points.push({
					x: centerX + (x - offscreen.width / 2),
					y: centerY + (y - offscreen.height / 2),
				});
			}
		}
	}

	return points;
}

const Fireworks: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const hardwareConcurrency = navigator.hardwareConcurrency || 8;
		const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
		const deviceMemory = navigatorWithMemory.deviceMemory || 8;
		const alreadyPlayed = sessionStorage.getItem("portfolio-fireworks-played") === "true";

		if (reducedMotion || hardwareConcurrency <= 4 || deviceMemory <= 4 || alreadyPlayed) {
			return;
		}

		sessionStorage.setItem("portfolio-fireworks-played", "true");

		const container = containerRef.current;
		if (!container) return;

		// Create dark overlay for the background
		const overlay = document.createElement("div");
		overlay.style.cssText =
			"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99998;pointer-events:none;background:black;opacity:0;transition:none;";
		document.body.appendChild(overlay);

		// Create fireworks canvas
		const canvas = document.createElement("canvas");
		canvas.style.cssText =
			"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;pointer-events:none;";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let cancelled = false;
		const startTime = performance.now();
		const particles: Particle[] = [];
		const textParticles: TextParticle[] = [];
		const rockets: Rocket[] = [];
		let textExplosionTime = 0;

		const onResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", onResize);

		const createExplosion = (x: number, y: number) => {
			const color = COLORS[Math.floor(Math.random() * COLORS.length)];
			const count = 50 + Math.floor(Math.random() * 30);
			for (let i = 0; i < count; i++) {
				const angle = (Math.PI * 2 * i) / count;
				const speed = 2 + Math.random() * 5;
				particles.push({
					x,
					y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					color,
					size: 2 + Math.random() * 2.5,
					decay: 0.012 + Math.random() * 0.01,
					life: 1,
				});
			}
			const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
			for (let i = 0; i < 30; i++) {
				const angle = (Math.PI * 2 * i) / 30;
				const speed = 1 + Math.random() * 2.5;
				particles.push({
					x,
					y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					color: color2,
					size: 2.5 + Math.random() * 2,
					decay: 0.008 + Math.random() * 0.008,
					life: 1,
				});
			}
		};

		const createTextExplosion = (originX: number, originY: number) => {
			const w = canvas.width;
			const isMobile = w < 640;
			const textMaxWidth = isMobile ? w * 0.92 : Math.min(w * 0.88, 1000);
			const points = sampleTextPixels(
				["#1 Mistral", "Hackathon SF"],
				textMaxWidth,
				w / 2,
				originY
			);

			for (const pt of points) {
				const angle = Math.random() * Math.PI * 2;
				const speed = 3 + Math.random() * 8;
				const color =
					TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)];
				textParticles.push({
					x: originX,
					y: originY,
					tx: pt.x,
					ty: pt.y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					color,
					size: isMobile ? 1.2 + Math.random() * 0.8 : 1.8 + Math.random() * 1,
					life: 1,
					progress: 0,
				});
			}
			textExplosionTime = performance.now();
		};

		const launchRocket = () => {
			if (cancelled) return;
			const w = canvas.width;
			const h = canvas.height;
			// Avoid center area where text will appear - launch to sides
			const side = Math.random() < 0.5;
			const x = side ? w * 0.05 + Math.random() * w * 0.3 : w * 0.65 + Math.random() * w * 0.3;
			rockets.push({
				x,
				y: h + 10,
				vy: -(10 + Math.random() * 6),
				targetY: h * 0.1 + Math.random() * h * 0.3,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				exploded: false,
				trail: [],
			});
		};

		const launchTextRocket = () => {
			if (cancelled) return;
			const w = canvas.width;
			const h = canvas.height;
			const isMobile = w < 640;
			rockets.push({
				x: w / 2,
				y: h + 10,
				vy: -14,
				targetY: isMobile ? h * 0.3 : h * 0.38,
				color: "#ffd700",
				exploded: false,
				trail: [],
				isTextRocket: true,
			});
		};

		// Regular rockets in the first 2 seconds
		const launchTimes = [
			0, 200, 450, 700, 950, 1200, 1500, 1800,
		];
		const timeouts = launchTimes.map((t) =>
			window.setTimeout(launchRocket, t)
		);

		// Text rocket at 2.2s
		timeouts.push(
			window.setTimeout(() => {
				launchTextRocket();
			}, 2200)
		);

		const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

		const totalDuration = 6200;

		const animate = () => {
			if (cancelled) return;
			const elapsed = performance.now() - startTime;

			// Animate dark overlay
			// Fade in: 0-600ms → 0 to 0.55
			// Hold: 600ms to totalDuration-800ms
			// Fade out: last 800ms → 0.55 to 0
			const fadeInEnd = 600;
			const fadeOutStart = totalDuration - 800;
			const maxDarkness = 0.92;

			if (elapsed < fadeInEnd) {
				overlay.style.opacity = String((elapsed / fadeInEnd) * maxDarkness);
			} else if (elapsed < fadeOutStart) {
				overlay.style.opacity = String(maxDarkness);
			} else if (elapsed < totalDuration) {
				const fadeProgress = (elapsed - fadeOutStart) / (totalDuration - fadeOutStart);
				overlay.style.opacity = String(maxDarkness * (1 - fadeProgress));
			} else {
				overlay.style.opacity = "0";
			}

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw rockets
			for (let i = rockets.length - 1; i >= 0; i--) {
				const r = rockets[i];
				if (!r.exploded) {
					r.trail.push({ x: r.x, y: r.y, alpha: 1 });
					if (r.trail.length > (r.isTextRocket ? 25 : 15))
						r.trail.shift();
					r.y += r.vy;
					r.vy *= r.isTextRocket ? 0.98 : 0.985;

					for (const t of r.trail) {
						t.alpha -= r.isTextRocket ? 0.04 : 0.06;
						ctx.beginPath();
						ctx.arc(
							t.x,
							t.y,
							r.isTextRocket ? 3 : 2,
							0,
							Math.PI * 2
						);
						ctx.fillStyle = r.isTextRocket
							? `rgba(255,215,0,${Math.max(0, t.alpha)})`
							: `rgba(255,255,255,${Math.max(0, t.alpha)})`;
						ctx.fill();
					}

					ctx.beginPath();
					ctx.arc(r.x, r.y, r.isTextRocket ? 5 : 3, 0, Math.PI * 2);
					ctx.fillStyle = r.color;
					ctx.shadowColor = r.color;
					ctx.shadowBlur = r.isTextRocket ? 25 : 15;
					ctx.fill();
					ctx.shadowBlur = 0;

					if (r.y <= r.targetY) {
						r.exploded = true;
						if (r.isTextRocket) {
							createTextExplosion(r.x, r.y);
						} else {
							createExplosion(r.x, r.y);
						}
					}
				} else {
					if (r.trail.every((t) => t.alpha <= 0)) {
						rockets.splice(i, 1);
					} else {
						for (const t of r.trail) t.alpha -= 0.06;
					}
				}
			}

			// Draw regular particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.vy += 0.04;
				p.vx *= 0.99;
				p.life -= p.decay;

				if (p.life <= 0) {
					particles.splice(i, 1);
					continue;
				}

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.globalAlpha = Math.max(0, p.life);
				ctx.shadowColor = p.color;
				ctx.shadowBlur = 8;
				ctx.fill();
				ctx.shadowBlur = 0;
				ctx.globalAlpha = 1;
			}

			// Draw text particles
			if (textParticles.length > 0) {
				const textElapsed = performance.now() - textExplosionTime;

				for (let i = textParticles.length - 1; i >= 0; i--) {
					const tp = textParticles[i];

					if (textElapsed < 400) {
						tp.x += tp.vx;
						tp.y += tp.vy;
						tp.vx *= 0.95;
						tp.vy *= 0.95;
					} else if (textElapsed < 1200) {
						const t = (textElapsed - 400) / 800;
						const ease = easeOutCubic(Math.min(1, t));
						tp.x = tp.x + (tp.tx - tp.x) * (ease * 0.15);
						tp.y = tp.y + (tp.ty - tp.y) * (ease * 0.15);
					} else if (textElapsed < 2400) {
						tp.x += (tp.tx - tp.x) * 0.3;
						tp.y += (tp.ty - tp.y) * 0.3;
					} else {
						tp.x += (Math.random() - 0.5) * 1.5;
						tp.y += (Math.random() - 0.5) * 1.5 + 0.3;
						tp.life -= 0.04;
					}

					if (tp.life <= 0) {
						textParticles.splice(i, 1);
						continue;
					}

					const glowPulse =
						textElapsed > 1200 && textElapsed < 2400
							? 0.85 +
								0.15 *
									Math.sin(textElapsed * 0.005 + i * 0.1)
							: 1;

					ctx.beginPath();
					ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
					ctx.fillStyle = tp.color;
					ctx.globalAlpha = Math.max(0, tp.life * glowPulse);
					ctx.shadowColor = tp.color;
					ctx.shadowBlur = 4;
					ctx.fill();
					ctx.shadowBlur = 0;
					ctx.globalAlpha = 1;
				}
			}

			// Fade out canvas near the end
			if (elapsed > totalDuration - 700 && elapsed <= totalDuration) {
				canvas.style.opacity = String(
					1 - (elapsed - (totalDuration - 700)) / 700
				);
			}

			if (elapsed < totalDuration + 200) {
				requestAnimationFrame(animate);
			} else {
				cleanup();
			}
		};

		const cleanup = () => {
			cancelled = true;
			timeouts.forEach(clearTimeout);
			window.removeEventListener("resize", onResize);
			if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
			if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
		};

		requestAnimationFrame(animate);

		return cleanup;
	}, []);

	return <div ref={containerRef} />;
};

export default Fireworks;
