'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface MenuItem {
  title: string;
  href: string;
  subItems?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { title: 'Inicio', href: '/' },
  { 
    title: 'Servicios', 
    href: '#',
    subItems: [
      { title: 'Publicidad en redes', href: '/servicios/publicidad' },
      { title: 'Contenido para Instagram', href: '/servicios/contenido' },
      { title: 'Consultoría personalizada', href: '/servicios/consultoria' },
    ],
  },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'Contacto', href: '/contacto' },
];

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="bg-blackbrand sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pinkbrand to-[#ff66b2] flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 12h16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 4v16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-pinkbrand font-extrabold text-2xl tracking-wider">AVG CONNECTS</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center text-gray-100">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative" ref={menuRef}>
              {item.subItems ? (
                <>
                  <button
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    onClick={() => setMegaOpen((prev) => !prev)}
                    className="flex items-center gap-1 font-medium hover:text-pinkbrand transition"
                  >
                    {item.title}
                    <svg className={`w-4 h-4 transform transition-transform ${megaOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
                    </svg>
                  </button>

                  {/* Mega Menu */}
                  <div
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    className={`absolute left-0 top-full mt-3 w-64 bg-[#111] rounded-xl shadow-xl p-4 transition-all ${
                      megaOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
                    }`}
                  >
                    {item.subItems.map((sub, i) => (
                      <Link key={i} href={sub.href} className="block py-2 px-3 rounded hover:bg-[#222] transition">{sub.title}</Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href} className="hover:text-pinkbrand transition">{item.title}</Link>
              )}
            </div>
          ))}

          <Link href="/suscribete" className="ml-4 btn-pink hidden md:inline-block">¡Comenzar!</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff08] transition"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-50 transform transition-transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-xs bg-[#070707] p-6 shadow-2xl overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-pinkbrand font-bold text-xl">AVG CONNECTS</span>
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => setMobileMegaOpen(!mobileMegaOpen)}
                      className="w-full flex justify-between items-center py-2 px-2 font-medium border-b border-[#ffffff06]"
                    >
                      {item.title}
                      <svg className={`w-5 h-5 transform transition-transform ${mobileMegaOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
                      </svg>
                    </button>
                    <div className={`${mobileMegaOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all`}>
                      {item.subItems.map((sub, i) => (
                        <Link key={i} href={sub.href} className="block py-2 px-4 hover:bg-[#111] rounded">{sub.title}</Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="block py-2 px-2 border-b border-[#ffffff06]">{item.title}</Link>
                )}
              </div>
            ))}
            <Link href="/suscribete" className="btn-pink w-full mt-4 text-center block">¡Comenzar!</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
