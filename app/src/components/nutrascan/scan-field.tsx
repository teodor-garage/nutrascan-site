import { useEffect, useRef } from "react";

const ACCENT = "46, 107, 130"; // #2E6B82
const ACCENT_SOFT = "111, 168, 193"; // #6FA8C1

type Point = { x: number; y: number; phase: number };

/** Signature hero mechanic ("calibration" concept spine): a canvas overlay
 * of measurement points over the hero photo. A scan line sweeps down and
 * wakes nearby points; the cursor pulls a soft focus ring and brightens
 * points it passes near. Purely decorative chrome over the real <img> —
 * never load-bearing content, so it draws nothing until JS runs and that
 * is fine for crawlers/screenshots (the photo + alt text are the content). */
export function ScanField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    const GRID = 34;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function layout() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];
      const cols = Math.round(width / GRID);
      const rows = Math.round(height / GRID);
      const gx = width / cols;
      const gy = height / rows;
      for (let i = 1; i < cols; i++) {
        for (let j = 1; j < rows; j++) {
          points.push({ x: i * gx, y: j * gy, phase: Math.random() * Math.PI * 2 });
        }
      }
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.tx = -9999;
      pointer.ty = -9999;
    }

    let raf = 0;
    let running = false;
    let scanY = 0;

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT_SOFT}, 0.28)`;
        ctx!.fill();
      }
    }

    function tick(t: number) {
      ctx!.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      scanY += height / 4600;
      if (scanY > height + 60) scanY = -60;

      for (const p of points) {
        const distToScan = Math.abs(p.y - scanY);
        const scanWake = Math.max(0, 1 - distToScan / 90);

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distToPointer = Math.sqrt(dx * dx + dy * dy);
        const pointerWake = Math.max(0, 1 - distToPointer / 140);

        const breathe = 0.5 + 0.5 * Math.sin(t / 1400 + p.phase);
        const alpha = 0.14 + 0.16 * breathe + 0.55 * scanWake + 0.65 * pointerWake;
        const radius = 1 + 1.6 * scanWake + 2.2 * pointerWake;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${pointerWake > 0.05 ? ACCENT : ACCENT_SOFT}, ${Math.min(0.9, alpha)})`;
        ctx!.fill();
      }

      // scan line
      const scanGrad = ctx!.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, `rgba(${ACCENT}, 0)`);
      scanGrad.addColorStop(0.5, `rgba(${ACCENT}, 0.22)`);
      scanGrad.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx!.fillStyle = scanGrad;
      ctx!.fillRect(0, scanY - 40, width, 80);

      // pointer focus ring
      if (pointer.tx > -1000) {
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 26, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${ACCENT}, 0.5)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(pointer.x - 34, pointer.y);
        ctx!.lineTo(pointer.x - 18, pointer.y);
        ctx!.moveTo(pointer.x + 18, pointer.y);
        ctx!.lineTo(pointer.x + 34, pointer.y);
        ctx!.moveTo(pointer.x, pointer.y - 34);
        ctx!.lineTo(pointer.x, pointer.y - 18);
        ctx!.moveTo(pointer.x, pointer.y + 18);
        ctx!.lineTo(pointer.x, pointer.y + 34);
        ctx!.strokeStyle = `rgba(${ACCENT}, 0.55)`;
        ctx!.stroke();
      }

      if (running) raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    layout();
    if (reduceMotion) {
      drawStatic();
    } else {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    // Pause the loop entirely once the hero scrolls out of view — no point
    // spending a frame budget animating something nobody can see.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(canvas);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      visibility.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
    />
  );
}
