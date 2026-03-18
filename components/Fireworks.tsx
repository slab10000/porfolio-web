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

interface Rocket {
	x: number;
	y: number;
	vy: number;
	targetY: number;
	color: string;
	exploded: boolean;
	trail: { x: number; y: number; alpha: number }[];
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

const Fireworks: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

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
		const rockets: Rocket[] = [];

		const onResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", onResize);

		const createExplosion = (x: number, y: number) => {
			const color = COLORS[Math.floor(Math.random() * COLORS.length)];
			const count = 80 + Math.floor(Math.random() * 40);
			for (let i = 0; i < count; i++) {
				const angle = (Math.PI * 2 * i) / count;
				const speed = 2 + Math.random() * 5;
				particles.push({
					x, y,
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
					x, y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					color: color2,
					size: 2.5 + Math.random() * 2,
					decay: 0.008 + Math.random() * 0.008,
					life: 1,
				});
			}
		};

		const launchRocket = () => {
			if (cancelled) return;
			const w = canvas.width;
			const h = canvas.height;
			rockets.push({
				x: w * 0.15 + Math.random() * w * 0.7,
				y: h + 10,
				vy: -(10 + Math.random() * 6),
				targetY: h * 0.15 + Math.random() * h * 0.35,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				exploded: false,
				trail: [],
			});
		};

		// Launch rockets on a schedule
		const launchTimes = [
			0, 100, 250, 400, 550, 700, 850, 1000, 1150, 1300,
			1450, 1600, 1750, 1900, 2050, 2200, 2400, 2600, 2800,
		];
		const timeouts = launchTimes.map((t) => window.setTimeout(launchRocket, t));

		const animate = () => {
			if (cancelled) return;
			const elapsed = performance.now() - startTime;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw rockets
			for (let i = rockets.length - 1; i >= 0; i--) {
				const r = rockets[i];
				if (!r.exploded) {
					r.trail.push({ x: r.x, y: r.y, alpha: 1 });
					if (r.trail.length > 15) r.trail.shift();
					r.y += r.vy;
					r.vy *= 0.985;

					for (const t of r.trail) {
						t.alpha -= 0.06;
						ctx.beginPath();
						ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
						ctx.fillStyle = `rgba(255,255,255,${Math.max(0, t.alpha)})`;
						ctx.fill();
					}

					ctx.beginPath();
					ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
					ctx.fillStyle = r.color;
					ctx.shadowColor = r.color;
					ctx.shadowBlur = 15;
					ctx.fill();
					ctx.shadowBlur = 0;

					if (r.y <= r.targetY) {
						r.exploded = true;
						createExplosion(r.x, r.y);
					}
				} else {
					if (r.trail.every((t) => t.alpha <= 0)) {
						rockets.splice(i, 1);
					} else {
						for (const t of r.trail) t.alpha -= 0.06;
					}
				}
			}

			// Draw particles
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

			// Fade out in last 500ms
			if (elapsed > 2500 && elapsed <= 3000) {
				canvas.style.opacity = String(1 - (elapsed - 2500) / 500);
			}

			if (elapsed < 3500) {
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
		};

		// Start animation
		requestAnimationFrame(animate);

		return cleanup;
	}, []);

	return <div ref={containerRef} />;
};

export default Fireworks;
