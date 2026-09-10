import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DD2 — Danial',
  description: 'Danial — creator, editor, designer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
