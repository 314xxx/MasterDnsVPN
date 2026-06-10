import { useEffect, useRef } from 'react';

interface DotMatrixProps {
  status: 'idle' | 'connecting' | 'connected' | 'failed';
}

export default function DotMatrix({ status }: DotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const spacing = 18;
    const cols = Math.ceil(rect.width / spacing);
    const rows = Math.ceil(rect.height / spacing);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      frame++;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + spacing / 2;
          const y = r * spacing + spacing / 2;
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
          const norm = dist / maxDist;

          let alpha = 0.08;
          let radius = 1.8;

          if (status === 'connecting') {
            const wave = Math.sin(frame * 0.08 - norm * 8);
            alpha = 0.06 + Math.max(0, wave) * 0.35;
            radius = 1.8 + Math.max(0, wave) * 1.5;
          } else if (status === 'connected') {
            const breathe = Math.sin(frame * 0.04 + norm * 4);
            alpha = 0.08 + Math.max(0, breathe) * 0.2;
            radius = 1.8 + Math.max(0, breathe) * 0.8;
          } else if (status === 'failed') {
            alpha = 0.06 + (1 - norm) * 0.1;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(44, 62, 80, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [status]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
