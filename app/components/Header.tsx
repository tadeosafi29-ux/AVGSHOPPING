'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react';

// HeaderEcommerce.tsx
// Single-file React component (Next.js App Router compatible)
// Tailwind-first, accessible, responsive, megamenu, search, cart badge, user menu.

type MenuItem = {
  title: string;
  href?: string;
  sub?: { title: string; href: string }[];
};

const MENU: MenuItem[] = [
  { title: 'Inicio', href: '/' },
  {
    title: 'Colecciones',
    sub: [
      { title: 'Nuevos lanzamientos', href: '/colecciones/nuevos' },
      { title: 'Lo más vendido', href: '/colecciones/top' },
      { title: 'Ofertas', href: '/colecciones/ofertas' },
    ],
  },
  { title: 'Productos', href: '/productos' },
  { title: 'Servicios', href: '/servicios' },
  { title: 'Contacto', href: '/contacto' },
];

export default function HeaderEcommerce() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpenIndex, setMegaOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0); // integrate with your cart logic
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMegaOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // keyboard escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMegaOpenIndex(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Debounced search (simple)
  useEffect(() => {
    if (!query) return;
    const t = setTimeout(() => {
      // TODO: call your search API or router push
      // router.push(`/search?q=${encodeURIComponent(query)}`)
      console.log('search for', query);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center shadow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 12h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 4v16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg tracking-tight text-white">AVG CONNECTS</span>
                <div className="text-xs text-gray-300">Análisis · Trading · Contenido</div>
              </div>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation" ref={menuRef}>
              {MENU.map((m, idx) => (
                <div key={m.title} className="relative">
                  {m.sub ? (
                    <>
                      <button
                        onMouseEnter={() => setMegaOpenIndex(idx)}
                        onMouseLeave={() => setMegaOpenIndex(null)}
                        onClick={() => setMegaOpenIndex((p) => (p === idx ? null : idx))}
                        aria-expanded={megaOpenIndex === idx}
                        className="flex items-center gap-1 text-sm font-medium hover:text-red-400 transition"
                      >
                        {m.title}
                        <ChevronDown className={`w-4 h-4 transition-transform ${megaOpenIndex === idx ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega panel */}
                      <div
                        onMouseEnter={() => setMegaOpenIndex(idx)}
                        onMouseLeave={() => setMegaOpenIndex(null)}
                        className={`absolute left-0 top-full mt-3 w-80 bg-[#0b0b0b] rounded-lg shadow-lg p-4 ring-1 ring-black/60 transition-all ${
                          megaOpenIndex === idx ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
                        }`}
                        role="menu"
                        aria-hidden={megaOpenIndex !== idx}
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {m.sub.map((s) => (
                            <Link key={s.title} href={s.href} className="block px-3 py-2 rounded hover:bg-[#111] transition">
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={m.href || '#'} className="text-sm font-medium hover:text-red-400 transition">
                      {m.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center: Search (desktop) */}
          <div className="flex-1 hidden md:flex justify-center px-4">
            <div className="w-full max-w-lg">
              <label htmlFor="search" className="sr-only">Buscar productos</label>
              <div className="relative">
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos, marcas o contenido..."
                  className="w-full bg-[#111] placeholder-gray-400 text-sm py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            {/* CTA */}
            <Link href="/suscribete" className="hidden md:inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md font-semibold transition">
              Suscribite
            </Link>

            {/* Cart */}
            <Link href="/carrito" className="relative p-2 rounded hover:bg-white/5 transition">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">{cartCount}</span>
              )}
            </Link>

            {/* User */}
            <Link href="/mi-cuenta" className="p-2 rounded hover:bg-white/5 transition hidden md:inline-flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm hidden lg:inline">Mi cuenta</span>
            </Link>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded hover:bg-white/5">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 ${mobileOpen ? 'block' : 'hidden'}`} aria-hidden={!mobileOpen}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#050505] p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="font-bold text-lg">AVG CONNECTS</Link>
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {MENU.map((m) => (
              <div key={m.title}>
                {m.sub ? (
                  <details className="group">
                    <summary className="cursor-pointer py-2 font-medium flex justify-between items-center">{m.title}<ChevronDown className="w-4 h-4" /></summary>
                    <div className="mt-2 pl-2 flex flex-col gap-2">
                      {m.sub.map((s) => (
                        <Link key={s.title} href={s.href} className="block py-2 px-2 rounded hover:bg-[#111]">{s.title}</Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link href={m.href || '#'} className="block py-2 px-2 rounded hover:bg-[#111]">{m.title}</Link>
                )}
              </div>
            ))}

            <Link href="/suscribete" className="mt-4 bg-red-600 text-white py-2 rounded text-center font-semibold">Suscribite</Link>

            <div className="mt-6 border-t border-[#111] pt-4">
              <Link href="/mi-cuenta" className="block py-2">Mi cuenta</Link>
              <Link href="/carrito" className="block py-2">Carrito ({cartCount})</Link>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400">Soporte · Términos · Política de privacidad</div>
        </div>
      </div>
    </header>
  );
}
