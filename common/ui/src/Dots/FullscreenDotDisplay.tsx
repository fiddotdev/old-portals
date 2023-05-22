'use client';

import { useEffect, useRef } from 'react';

export const FullscreenDotDisplay = () => {
  const container = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    let drawing = true;

    const canvas = container.current.getContext('2d');
    let width = (container.current.width = window.innerWidth);
    let height = (container.current.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;

    const DOT_SPACING = 28;
    const DOT_SIZE = 4;

    function draw() {
      if (!canvas) return;

      canvas.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += DOT_SPACING) {
        for (let y = 0; y < height; y += DOT_SPACING) {
          canvas.beginPath();

          const diffX = Math.abs(mouseX - x);
          const diffY = Math.abs(mouseY - y);
          const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

          const alpha = Math.min(Math.max(5 * (1 / distance), 0.06), 0.3);
          canvas.fillStyle = `rgba(0, 0, 0, ${alpha})`;

          canvas.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2);
          canvas.fill();
        }
      }

      drawing && requestAnimationFrame(draw);
    }
    draw();

    function handleMouseMove(mouseEvent: MouseEvent) {
      mouseX = mouseEvent.clientX;
      mouseY = mouseEvent.clientY;
    }

    function handleResize() {
      if (!container.current) {
        return;
      }

      width = container.current.width = window.innerWidth;
      height = container.current.height = window.innerHeight;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    const hasValue = !!container.current;

    return () => {
      drawing = false;
      if (hasValue) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [container]);

  return (
    <>
      <div className="ui-fixed ui-inset-0 ui-overflow-hidden ui-pointer-events-none">
        <canvas ref={container} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};
