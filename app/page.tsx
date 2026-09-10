'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';

const projects = [
  { n: '01', title: 'DYOLMEH', type: 'Digital Universe', text: 'A cinematic personal platform built around media, creativity and interaction.' },
  { n: '02', title: 'VISUAL STORIES', type: 'Creative Direction', text: 'Frames, edits and visual experiments shaped into memorable stories.' },
  { n: '03', title: 'MOTION LAB', type: '3D / Motion', text: 'Interactive worlds, transitions and motion systems made to feel alive.' },
];

export default function Home() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => { const f = () => setScroll(window.scrollY); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  return (
    <main>
      <div className="noise" />
      <nav><div className="brand">DD<span>2</span></div><div className="navlinks"><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#contact">CONTACT</a></div><div className="status"><i /> AVAILABLE</div></nav>

      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> PERSONAL PORTFOLIO / 2026</p><h1>MAKE<br /><em>YOUR</em><br />MARK.</h1><p className="intro">I&apos;m Danial — a creator focused on visual storytelling, digital experiences and things that feel a little different.</p><a className="pill" href="#work">EXPLORE WORK <ArrowDown size={15} /></a></div>
        <div className="orb-wrap" style={{ transform: `translateY(${scroll * -.08}px) rotateX(${scroll * .025}deg) rotateY(${scroll * .035}deg)` }}><div className="orb"><div className="orb-ring ring1" /><div className="orb-ring ring2" /><div className="orb-ring ring3" /><div className="orb-core">DD2</div></div><div className="orb-shadow" /></div>
        <div className="scrollhint">SCROLL TO DISCOVER <span>01 — 06</span></div>
      </section>

      <section id="about" className="about"><p className="section-no">01 / ABOUT</p><div><h2>CURIOUS<br /><span>BY DEFAULT.</span></h2><p className="bigtext">I like turning ideas into experiences — from edited frames and visual identities to interactive digital spaces. The goal is simple: make it memorable.</p></div></section>

      <section id="work" className="work"><div className="section-head"><p className="section-no">02 / SELECTED WORK</p><p>THINGS I&apos;VE BUILT / MADE / BROKEN / REBUILT</p></div>{projects.map((p) => <article className="project" key={p.n}><span>{p.n}</span><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.text}</p></div><ArrowUpRight /></article>)}</section>

      <section className="manifesto"><div className="manifesto-word">CREATE<br /><i>WITHOUT</i><br />LIMITS.</div><div className="cube" /></section>

      <section id="contact" className="contact"><p className="section-no">03 / CONTACT</p><h2>LET&apos;S MAKE<br /><em>SOMETHING.</em></h2><a href="mailto:hello@dyolmeh.ir" className="contact-link"><Mail size={18} /> hello@dyolmeh.ir <ArrowUpRight /></a><footer><span>DD2 © 2026</span><span>DANIAL YOLMEH</span><span>BUILT WITH CURIOSITY</span></footer></section>
    </main>
  );
}
