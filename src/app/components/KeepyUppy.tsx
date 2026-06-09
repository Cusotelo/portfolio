"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const GRAVITY = 0.35;
const BOUNCE_DAMPEN = 0.55;
const BALL_RADIUS = 28;

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function KeepyUppy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef<Ball | null>(null);
  const animRef = useRef<number>(0);
  const [touches, setTouches] = useState(0);
  const [best, setBest] = useState(0);
  const [started, setStarted] = useState(false);
  const touchesRef = useRef(0);

  const getCanvas = () => canvasRef.current;

  const initBall = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    ballRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
    };
  }, []);

  const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    const r = BALL_RADIUS;
    // shadow
    ctx.shadowColor = "rgba(165,0,68,0.5)";
    ctx.shadowBlur = 18;

    // ball base
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(ball.x - 8, ball.y - 8, 2, ball.x, ball.y, r);
    grad.addColorStop(0, "#1a6fd4");
    grad.addColorStop(0.5, "#004d98");
    grad.addColorStop(1, "#002855");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;

    // pentagon patches
    const patches = [
      { angle: -Math.PI / 2, color: "#a50044" },
      { angle: Math.PI / 2 - (2 * Math.PI) / 5, color: "#a50044" },
      { angle: Math.PI / 2 + (2 * Math.PI) / 5, color: "#edbb00" },
    ];
    patches.forEach(({ angle, color }) => {
      const px = ball.x + (r * 0.45) * Math.cos(angle);
      const py = ball.y + (r * 0.45) * Math.sin(angle);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = angle + (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const bx = px + (r * 0.28) * Math.cos(a);
        const by = py + (r * 0.28) * Math.sin(a);
        i === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });

    // shine
    ctx.beginPath();
    ctx.arc(ball.x - r * 0.3, ball.y - r * 0.35, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fill();
  };

  const loop = useCallback(() => {
    const canvas = getCanvas();
    const ball = ballRef.current;
    if (!canvas || !ball) return;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.vy += GRAVITY;
    ball.x += ball.vx;
    ball.y += ball.vy;

    // floor
    if (ball.y + BALL_RADIUS >= canvas.height) {
      ball.y = canvas.height - BALL_RADIUS;
      ball.vy *= -BOUNCE_DAMPEN;
      ball.vx *= 0.92;
    }
    // walls
    if (ball.x - BALL_RADIUS <= 0) { ball.x = BALL_RADIUS; ball.vx *= -0.7; }
    if (ball.x + BALL_RADIUS >= canvas.width) { ball.x = canvas.width - BALL_RADIUS; ball.vx *= -0.7; }

    drawBall(ctx, ball);
    animRef.current = requestAnimationFrame(loop);
  }, []);

  const kick = useCallback((cx: number, cy: number) => {
    const ball = ballRef.current;
    const canvas = getCanvas();
    if (!ball || !canvas) return;

    const dx = ball.x - cx;
    const dy = ball.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > BALL_RADIUS * 2.5) return;

    if (!started) {
      setStarted(true);
    }

    const power = 14;
    ball.vx = (dx / dist) * power * 0.6 + (Math.random() - 0.5) * 2;
    ball.vy = (dy / dist) * power * -1;

    touchesRef.current += 1;
    setTouches(touchesRef.current);
    setBest((b) => Math.max(b, touchesRef.current));
  }, [started]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    kick(e.clientX - rect.left, e.clientY - rect.top);
  }, [kick]);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = getCanvas();
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const t = e.changedTouches[0];
    kick(t.clientX - rect.left, t.clientY - rect.top);
  }, [kick]);

  const reset = () => {
    touchesRef.current = 0;
    setTouches(0);
    setStarted(false);
    initBall();
  };

  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initBall();
    animRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [initBall, loop]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex items-center gap-8 mb-3 text-sm font-mono">
        <span className="text-[var(--barca-gold)]">
          touches: <span className="text-white font-bold">{touches}</span>
        </span>
        <span className="text-zinc-400">
          best: <span className="text-[var(--barca-gold)] font-bold">{best}</span>
        </span>
        {touches > 0 && (
          <button
            onClick={reset}
            className="text-zinc-500 hover:text-white transition-colors text-xs underline"
          >
            reset
          </button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onTouchStart={handleTouch}
        className="w-full rounded-xl cursor-pointer"
        style={{ height: 240, background: "rgba(0,77,152,0.06)", border: "1px solid rgba(0,77,152,0.2)" }}
      />

      {!started && (
        <p className="mt-3 text-zinc-500 text-xs font-mono animate-pulse">
          tap the ball to start
        </p>
      )}
    </div>
  );
}
