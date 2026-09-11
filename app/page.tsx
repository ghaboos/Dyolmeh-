'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import ThreeHero from '../components/ThreeHero';
import CursorGlow from '../components/CursorGlow';
import ProjectVisual from '../components/ProjectVisual';
import CaseStudyModal from '../components/CaseStudyModal';

const projects = [
  { n: '01', title: 'DYOLMEH', type: 'DIGITAL UNIVERSE', text: 'A cinematic personal platform built around media, creativity and interaction.' },
  { n: '02', title: 'VISUAL STORIES', type: 'CREATIVE DIRECTION', text: 'Frames, edits and visual experiments shaped into memorable stories.' },
  { n: '03', title: 'MOTION LAB', type: '3D / MOTION', text: 'Interactive worlds, transitions and motion systems made to feel alive.' },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el); }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    let ticking = false;
    const f = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 40);
        setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        ticking = false;
      });
    };
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const heroScale = 1 - Math.min(scrollProgress * 0.22, 0.22);
  const heroY = Math.min(scrollProgress * 180, 180);

  return (
    <main style={{ '--scroll': scrollProgress } as React.CSSProperties}>
      <CursorGlow />
      <div className="noise" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <nav className={scrolled ? 'nav scrolled' : 'nav'} aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="DD2 home">DD<span>2</span></a>
        <div className="navlinks"><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#contact">CONTACT</a></div>
        <div className="status"><i aria-hidden="true" /> AVAILABLE FOR CREATIVE WORK</div>
      </nav>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" style={{ transform: `translateY(${heroY * -0.16}px)` }}>
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> PERSONAL PORTFOLIO / 2026</p>
          <h1 id="hero-title">MAKE<br /><em>YOUR</em><br />MARK<span>.</span></h1>
          <p className="intro">I&apos;m Danial — creator, editor and digital explorer. I build visual stories and immersive experiences that don&apos;t feel ordinary.</p>
          <div className="hero-actions"><a className="pill primary" href="#work">EXPLORE WORK <ArrowDown size={15} aria-hidden="true" /></a><a className="text-link" href="#contact">LET&apos;S TALK <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </div>
        <div className="hero-3d" style={{ '--hero-y': `${heroY * 0.22}px`, '--hero-scale': heroScale, opacity: 1 - scrollProgress * 0.55 } as React.CSSProperties} aria-hidden="true"><ThreeHero /><div className="orbit-label label-one">01 / CREATE</div><div className="orbit-label label-two">DD2 — 3D SPACE</div></div>
        <div className="hero-grid" aria-hidden="true" /><div className="scrollhint" aria-hidden="true">SCROLL TO DISCOVER <span>01 — 05</span></div>
      </section>

      <section id="about" className="about" aria-labelledby="about-title">
        <p className="section-no">01 / ABOUT</p>
        <Reveal><p className="mini-title">THE PERSON BEHIND THE PIXELS</p><h2 id="about-title">CURIOUS<br /><span>BY DEFAULT.</span></h2><p className="bigtext">I like turning ideas into experiences — from edited frames and visual identities to interactive digital spaces. I&apos;m always experimenting with new tools, new worlds and better ways to make an idea feel alive.</p><div className="stats"><div><strong>01</strong><span>CREATIVE MIND</span></div><div><strong>24/7</strong><span>IDEAS RUNNING</span></div><div><strong>∞</strong><span>EXPERIMENTS</span></div></div></Reveal>
      </section>

      <section id="work" className="work" aria-labelledby="work-title"><div className="section-head"><p className="section-no" id="work-title">02 / SELECTED WORK</p><p>BUILT / MADE / BROKEN / REBUILT</p></div>{projects.map((p, i) => <Reveal key={p.n} className={`project-reveal delay-${i}`}><article className="project" tabIndex={0} role="button" aria-label={`Open case study: ${p.title}`} onClick={() => setActiveProject(p)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveProject(p); } }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`); e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`); }} onMouseLeave={(e) => { e.currentTarget.style.setProperty('--mx', '0deg'); e.currentTarget.style.setProperty('--my', '0deg'); }}><span aria-hidden="true">{p.n}</span><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.text}</p></div><ArrowUpRight aria-hidden="true" /></article></Reveal>)}</section>

      <section className="showcase" id="showcase" aria-labelledby="showcase-title"><div className="showcase-head"><Reveal><p className="section-no">03 / 3D SHOWCASE</p><h2 id="showcase-title">WORK<br /><span>IN MOTION.</span></h2></Reveal><p className="showcase-note">MOVE YOUR CURSOR<br />THROUGH THE OBJECTS.</p></div><div className="visual-grid-list">{projects.map((p, i) => <Reveal key={p.n} className={`visual-reveal delay-${i}`}><ProjectVisual index={i} title={p.title} label={p.type} /></Reveal>)}</div></section>

      <section className="manifesto" aria-labelledby="manifesto-title"><Reveal><p className="section-no">04 / MANIFESTO</p><div className="manifesto-word" id="manifesto-title">CREATE<br /><i>WITHOUT</i><br />LIMITS.</div></Reveal><Reveal className="cube-reveal"><div className="cube-scene"><div className="cube" aria-hidden="true"><span>DD2</span></div><p>KEEP MOVING.<br />KEEP MAKING.</p></div></Reveal></section>

      <section id="contact" className="contact" aria-labelledby="contact-title"><Reveal><p className="section-no">05 / CONTACT</p><h2 id="contact-title">LET&apos;S MAKE<br /><em>SOMETHING.</em></h2><p className="contact-copy">Got an idea, project or weird concept? Send it over.</p><a href="mailto:hello@dyolmeh.ir" className="contact-link" aria-label="Email hello@dyolmeh.ir"><Mail size={18} aria-hidden="true" /> hello@dyolmeh.ir <ArrowUpRight aria-hidden="true" /></a><footer><span>DD2 © 2026</span><span>DANIAL YOLMEH</span><span>BUILT WITH CURIOSITY</span></footer></Reveal></section>
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
