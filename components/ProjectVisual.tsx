'use client';

import { useRef } from 'react';

type Props = { index: number; title: string; label: string };

export default function ProjectVisual({ index, title, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.setProperty('--rx', `${y}deg`);
    el.style.setProperty('--ry', `${x}deg`);
    el.style.setProperty('--px', `${(e.clientX - r.left) / r.width * 100}%`);
    el.style.setProperty('--py', `${(e.clientY - r.top) / r.height * 100}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--px', '50%');
    el.style.setProperty('--py', '50%');
  };

  return (
    <div ref={ref} className={`project-visual pv-${index}`} onMouseMove={move} onMouseLeave={leave}>
      <div className="visual-glow" />
      <div className="visual-grid" />
      <div className="visual-orbit orbit-a" />
      <div className="visual-orbit orbit-b" />
      <div className="visual-core"><span>0{index + 1}</span></div>
      <div className="visual-copy"><small>{label}</small><strong>{title}</strong></div>
      <div className="visual-index">DD2 / 0{index + 1}</div>
    </div>
  );
}
