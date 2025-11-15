// /components/Footer.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const year = new Date().getFullYear();

  async function onSubscribe(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      // TODO: reemplazar por endpoint real
      await new Promise((r) => setTimeout(r, 700));
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  function scrollTop() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-blackbrand text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pinkbrand to-[#ff66b2] flex items-center justify-center shadow-[0_6px_30px_rgba(255,0,153,0.35)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12h16" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 4v16" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-pinkbrand font-extrabold text-lg">AVG CONNECTS</span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm">Estrategias creativas y performance marketing para crecer tu negocio.</p>
          <div className="mt-4 text-sm text-gray-500">Soporte: hola@avgconnects.com</div>
        </div>

        <div>
          <h4 className="text-pinkbrand font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/suscribete">¡Comenzar!</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pinkbrand font-semibold mb-3">Servicios</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/servicios/pub">Publicidad en redes</Link></li>
            <li><Link href="/servicios/contenido">Contenido para Instagram</Link></li>
            <li><Link href="/servicios/consultoria">Consultoría personalizada</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pinkbrand font-semibold mb-3">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-3">Recibí tips y ofertas exclusivas. Sin spam.</p>
          <form onSubmit={onSubscribe} className="flex gap-2">
            <input
              aria-label="Email"
              className="w-full px-3 py-2 rounded bg-[#0b0b0b] border border-white/6 placeholder-gray-400"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="px-3 py-2 rounded bg-pinkbrand text-blackbrand font-semibold">
              {status === 'sending' ? 'Enviando...' : 'OK'}
            </button>
          </form>
          {status === 'ok' && <div className="text-green-400 mt-2 text-sm">¡Gracias! Revisa tu casilla.</div>}
          {status === 'error' && <div className="text-rose-400 mt-2 text-sm">Email inválido o error.</div>}
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm gap-4">
          <div>© {year} AVG CONNECTS. Todos los derechos reservados.</div>
          <div className="flex items-center gap-4">
            <button onClick={scrollTop} className="hover:text-pinkbrand">Volver arriba</button>
            <Link href="/aviso-legal" className="hover:text-pinkbrand">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-pinkbrand">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
