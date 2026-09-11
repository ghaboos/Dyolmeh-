import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DD2 — Danial',
  description: 'Danial — creator, editor and designer.',
};

const accessibilityStyles = `
  :focus-visible{outline:2px solid #f5c542;outline-offset:5px;border-radius:4px}
  .skip-link{position:fixed;left:16px;top:12px;z-index:1000;padding:10px 14px;background:#f5c542;color:#030303;font:11px 'DM Mono',monospace;transform:translateY(-160%);transition:transform .2s}
  .skip-link:focus{transform:translateY(0)}
  @media(max-width:900px){.hero{grid-template-columns:minmax(0,1fr)!important;min-width:0!important}.hero-copy,.hero-3d{min-width:0!important;max-width:100%!important}.hero-3d{transform:translate3d(0,var(--hero-y,0),0) scale(var(--hero-scale,1))!important;width:100%!important;margin-left:0!important;justify-self:stretch!important}}
  @media(max-width:600px){.hero .hero-3d{width:100%!important;max-width:100%!important;margin-left:0!important;justify-self:stretch!important}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.reveal{transition:none!important}.project,.project-visual,.cursor-glow{transition:none!important}.visual-glow,.orbit-a,.orbit-b{animation:none!important}}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: accessibilityStyles }} />
      </head>
      <body>
        <a className="skip-link" href="#top">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
