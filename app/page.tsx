'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import ThreeHero from '../components/ThreeHero';

const projects = [
  { n: '01', title: 'DYOLMEH', type: 'DIGITAL UNIVERSE', text: 'A cinematic personal platform built around media, creativity and interaction.' },
  { n: '02', title: 'VISUAL STORIES', type: 'CREATIVE DIRECTION', text: 'Frames, edits and visual experiments shaped into memorable stories.' },
  { n: '03', title: 'MOTION LAB', type: '3D / MOTION', text: 'Interactive worlds, transitions and motion systems made to feel alive.' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);

  return (
    <main>
      <div className="noise" />
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <a className="brand" href="#top">DD<span>2</span></a>
        <div className="navlinks"><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#contact">CONTACT</a></div>
        <div className="status"><i /> AVAILABLE FOR CREATIVE WORK</div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={14} /> PERSONAL PORTFOLIO / 2026</p>
          <h1>MAKE<br /><em>YOUR</em><br />MARK<span>.</span></h1>
          <p className="intro">I&apos;m Danial — creator, editor and digital explorer. I build visual stories and immersive experiences that don&apos;t feel ordinary.</p>
          <div className="hero-actions"><a className="pill primary" href="#work">EXPLORE WORK <ArrowDown size={15} /></a><a className="text-link" href="#contact">LET&apos;S TALK <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="hero-3d"><ThreeHero /><div className="orbit-label label-one">01 / CREATE</div><div className="orbit-label label-two">DD2 — 3D SPACE</div></div>
        <div className="hero-grid" />
        <div className="scrollhint">SCROLL TO DISCOVER <span>01 — 06</span></div>
      </section>

      <section id="about" className="about">
        <p className="section-no">01 / ABOUT</p>
        <div><p className="mini-title">THE PERSON BEHIND THE PIXELS</p><h2>CURIOUS<br /><span>BY DEFAULT.</span></h2><p className="bigtext">I like turning ideas into experiences — from edited frames and visual identities to interactive digital spaces. I&apos;m always experimenting with new tools, new worlds and better ways to make an idea feel alive.</p><div className="stats"><div><strong>01</strong><span>CREATIVE MIND</span></div><div><strong>24/7</strong><span>IDEAS RUNNING</span></div><div><strong>∞</strong><span>EXPERIMENTS</span></div></div></div>
      </section>

      <section id="work" className="work"><div className="section-head"><p className="section-no">02 / SELECTED WORK</p><p>BUILT / MADE / BROKEN / REBUILT</p></div>{projects.map((p) => <article className="project" key={p.n}><span>{p.n}</span><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.text}</p></div><ArrowUpRight /></article>)}</section>

      <section className="manifesto"><div><p className="section-no">03 / MANIFESTO</p><div className="manifesto-word">CREATE<br /><i>WITHOUT</i><br />LIMITS.</div></div><div className="cube-scene"><div className="cube"><span>DD2</span></div><p>KEEP MOVING.<br />KEEP MAKING.</p></div></section>

      <section id="contact" className="contact"><p className="section-no">04 / CONTACT</p><h2>LET&apos;S MAKE<br /><em>SOMETHING.</em></h2><p className="contact-copy">Got an idea, project or weird concept? Send it over.</p><a href="mailto:hello@dyolmeh.ir" className="contact-link"><Mail size={18} /> hello@dyolmeh.ir <ArrowUpRight /></a><footer><span>DD2 © 2026</span><span>DANIAL YOLMEH</span><span>BUILT WITH CURIOSITY</span></footer></section>
    </main>
  );
}
