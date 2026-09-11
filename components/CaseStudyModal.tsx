'use client';

import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

type Project = { n: string; title: string; type: string; text: string };
type Props = { project: Project | null; onClose: () => void };

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
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [project, onClose]);

  if (!project) return null;
  const info = details[project.n];

  return (
    <div className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="case-panel">
        <button className="case-close" onClick={onClose} aria-label="Close case study"><X size={20} /></button>
        <div className="case-art" aria-hidden="true">
          <div className="case-art-grid" /><div className="case-orbit case-orbit-a" /><div className="case-orbit case-orbit-b" />
          <div className="case-core"><span>{project.n}</span></div><small>DD2 / CASE STUDY</small>
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
      <style jsx global>{`
        .case-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:5vw;background:rgba(0,0,0,.78);backdrop-filter:blur(20px);animation:caseFade .3s ease}
        .case-panel{width:min(1180px,100%);max-height:min(820px,90vh);overflow:auto;display:grid;grid-template-columns:44% 56%;position:relative;border:1px solid #ffffff14;background:linear-gradient(135deg,#0d0c09,#050505 55%,#08070b);box-shadow:0 40px 140px #000;animation:caseIn .5s cubic-bezier(.16,1,.3,1)}
        .case-close{position:absolute;right:18px;top:18px;z-index:5;width:44px;height:44px;display:grid;place-items:center;border:1px solid #ffffff18;background:#030303aa;color:#aaa;cursor:pointer;transition:.25s}.case-close:hover{color:var(--gold);border-color:#f5c54266;transform:rotate(90deg)}
        .case-art{min-height:610px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 45%,#f5c54218,transparent 28%),linear-gradient(145deg,#11100d,#050505 68%,#08070b);border-right:1px solid #ffffff0d;display:grid;place-items:center}
        .case-art-grid{position:absolute;inset:-30%;background-image:linear-gradient(#ffffff09 1px,transparent 1px),linear-gradient(90deg,#ffffff09 1px,transparent 1px);background-size:46px 46px;transform:perspective(700px) rotateX(62deg) rotateZ(-8deg) translateY(20%);opacity:.45}
        .case-orbit{position:absolute;left:50%;top:47%;border:1px solid #f5c54255;border-radius:50%;transform:translate(-50%,-50%);transform-style:preserve-3d}.case-orbit-a{width:60%;height:60%;transform:translate(-50%,-50%) rotateX(67deg) rotateZ(-20deg);animation:caseOrbitA 9s linear infinite}.case-orbit-b{width:45%;height:76%;border-color:#6d5cff66;transform:translate(-50%,-50%) rotateY(66deg) rotateZ(18deg);animation:caseOrbitB 12s linear infinite reverse}
        .case-core{width:120px;height:120px;border:1px solid #f5c54299;background:linear-gradient(135deg,#f5c5421c,#6d5cff10);box-shadow:0 0 70px #f5c54225,inset 0 0 35px #f5c54218;transform:rotate(45deg);display:grid;place-items:center;z-index:2}.case-core span{transform:rotate(-45deg);font:13px 'DM Mono';color:var(--gold);text-shadow:0 0 22px var(--gold)}.case-art small{position:absolute;left:28px;bottom:26px;font:9px 'DM Mono';letter-spacing:1.7px;color:#666}
        .case-content{padding:72px 7vw 62px 58px;display:flex;flex-direction:column;justify-content:center}.case-content h2{font-size:clamp(55px,6vw,92px);line-height:.84;letter-spacing:-.07em;margin:24px 0}.case-content h2 span{color:var(--gold)}.case-lead{max-width:570px;font-size:18px;line-height:1.7;color:#aaa;font-weight:300}.case-divider{height:1px;background:#ffffff12;margin:36px 0}.case-meta{display:grid;gap:24px}.case-meta div{display:grid;gap:8px}.case-meta small{font:9px 'DM Mono';letter-spacing:1.6px;color:#666}.case-meta strong{font-size:14px;line-height:1.55;font-weight:500;color:#ddd}.case-link{width:max-content;display:flex;align-items:center;gap:12px;margin-top:42px;padding:14px 18px;border:1px solid #f5c54244;color:var(--gold);font:10px 'DM Mono';letter-spacing:1.2px;transition:.3s}.case-link:hover{background:#f5c5420d;box-shadow:0 15px 45px #f5c54212;transform:translateY(-2px)}
        @keyframes caseFade{from{opacity:0}to{opacity:1}}@keyframes caseIn{from{opacity:0;transform:translateY(30px) scale(.97)}to{opacity:1;transform:none}}@keyframes caseOrbitA{to{transform:translate(-50%,-50%) rotateX(67deg) rotateZ(340deg)}}@keyframes caseOrbitB{to{transform:translate(-50%,-50%) rotateY(66deg) rotateZ(-342deg)}}
        @media(max-width:800px){.case-modal{padding:14px}.case-panel{grid-template-columns:1fr;max-height:92vh}.case-art{min-height:300px;height:38vh;max-height:360px;border-right:0;border-bottom:1px solid #ffffff0d}.case-core{width:82px;height:82px}.case-content{padding:34px 24px 30px}.case-content h2{font-size:clamp(42px,14vw,70px);margin:18px 0}.case-lead{font-size:15px}.case-divider{margin:25px 0}.case-link{margin-top:28px}.case-close{right:12px;top:12px;width:40px;height:40px}}
        @media(prefers-reduced-motion:reduce){.case-modal,.case-panel,.case-orbit-a,.case-orbit-b{animation:none!important}}
      `}</style>
    </div>
  );
}
