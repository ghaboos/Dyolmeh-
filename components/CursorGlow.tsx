'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
