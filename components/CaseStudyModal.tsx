'use client';

import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

type Project = {
  n: string;
  title: string;
  type: string;
  text: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

const details: Record<string, { tags: string[]; result: string }> = {
  '01': { tags: ['PRODUCT DESIGN', 'WEBGL', 'INTERACTION'], result: 'A digital space designed to turn a personal archive into an experience.' },
  '02': { tags: ['EDITING', 'ART DIRECTION', 'STORYTELLING'], result: 'Visual language built around rhythm, atmosphere and memorable frames.' },
  '03': { tags: ['THREE.JS', 'MOTION', 'CREATIVE CODE'], result: 'A motion playground where depth, light and interaction become the interface.' },
};

export default function CaseStudyModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const info = details[project.n];

  return (
    <div className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="case-panel">
        <button className="case-close" onClick={onClose} aria-label="Close case study"><X size={20} /></button>
        <div className="case-art" aria-hidden="true">
          <div className="case-art-grid" />
          <div className="case-orbit case-orbit-a" />
          <div className="case-orbit case-orbit-b" />
          <div className="case-core"><span>{project.n}</span></div>
          <small>DD2 / CASE STUDY</small>
        </div>
        <div className="case-content">
          <p className="section-no">{project.n} / {project.type}</p>
          <h2 id="case-title">{project.title}<span>.</span></h2>
          <p className="case-lead">{project.text}</p>
          <div className="case-divider" />
          <div className="case-meta"><div><small>FOCUS</small><strong>{info.tags.join(' · ')}</strong></div><div><small>OUTCOME</small><strong>{info.result}</strong></div></div>
          <a className="case-link" href="#contact" onClick={onClose}>START A PROJECT <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </div>
  );
}
