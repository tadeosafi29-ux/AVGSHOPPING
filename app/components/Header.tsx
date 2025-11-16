'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  Search as IconSearch,
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
  Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Product = { id: string; title: string; href: string; image: string; price?: string; tag?: string };

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(2);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  // fetch featured products (API route /api/featured)
  useEffect(() => {
    fetch('/api/featured').then(r => r.json()).then((data) => {
      if (Array.isArray(data)) setProducts(data);
    }).catch(() => {
      /* fallback mock if API missing */
      setProducts([
        { id: '1', title: 'Zapatillas AirX', href: '/p/airx', image: 'https://via.placeholder.com/600x400?text=AirX', price: '$129' },
        { id: '2', title: 'Chaqueta Pro', href: '/p/chaqueta-pro', image: 'https://via.placeholder.com/600x400?text=Chaqueta+Pro', price: '$199' },
        { id: '3', title: 'Reloj SmartX', href: '/p/smartx', image: 'https://via.placeholder.com/600x400?text=SmartX', price: '$249' },
        { id: '4', title: 'Auriculares AirBeat', href: '/p/airbeat', image: 'https://via.placeholder.com/600x400?text=AirBeat', price: '$99' },
      ]);
    });
  }, []);

  // small effect: shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // search suggestions (mock)
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!search.trim()) { setSuggestions([]); return; }
    debounceRef.current = window.setTimeout(() => {
      const q = search.trim();
      setSuggestions([`${q} premium`, `${q} oferta`, `Mejor ${q} 2025`]);
    }, 200) as unknown as number;
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [search]);

  // keyboard escape closes mega & mobile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/70 h-14' : 'bg-black/60 h-16'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="h-full flex items-center justify-between gap-4">
            {/* LEFT: logo + primary nav (desktop) */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center shadow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12h16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 4v16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="hidden sm:inline-block text-white font-extrabold text-lg tracking-wide">AVG CONNECTS</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-gray-200 hover:text-white transition">Inicio</Link>

                {/* mega toggle */}
                <button
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={() => setMegaOpen(false)}
                  aria-expanded={megaOpen}
                  className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-white transition"
                >
                  Colecciones <ChevronDown className={`w-4 h-4 ${megaOpen ? 'rotate-180' : ''}`} />
                </button>

                <Link href="/ofertas" className="text-sm font-medium text-gray-200 hover:text-white transition">Ofertas</Link>
                <Link href="/blog" className="text-sm font-medium text-gray-200 hover:text-white transition">Blog</Link>
                <Link href="/contacto" className="text-sm font-medium text-gray-200 hover:text-white transition">Contacto</Link>
              </nav>
            </div>

            {/* CENTER: search */}
            <div className="flex-1 hidden md:flex justify-center px-4">
              <div className="w-full max-w-3xl relative">
                <label htmlFor="search" className="sr-only">Buscar productos</label>
                <div className="relative">
                  <input
                    id="search"
                    ref={searchRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar productos, marcas o colecciones..."
                    className="w-full bg-[#0f0f0f] text-sm placeholder-gray-400 py-2 pl-10 pr-4 rounded-full border border-white/6 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                  />
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      id="search-suggestions"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute mt-2 w-full bg-[#0b0b0b] rounded-lg shadow-lg border border-white/6 overflow-hidden z-50"
                    >
                      {suggestions.map((s) => (
                        <li key={s} className="px-3 py-2 hover:bg-[#111] cursor-pointer text-sm text-gray-200">
                          <Link href={`/search?q=${encodeURIComponent(s)}`}>{s}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: actions */}
            <div className="flex items-center gap-3">
              <button aria-label="Favoritos" className="p-2 rounded hover:bg-white/5 transition hidden md:inline-flex">
                <Heart className="w-5 h-5" />
              </button>

              <button aria-label="Notificaciones" className="p-2 rounded hover:bg-white/5 transition hidden md:inline-flex">
                <Bell className="w-5 h-5" />
              </button>

              <Link href="/carrito" className="relative p-2 rounded hover:bg-white/5 transition">
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <Link href="/mi-cuenta" className="hidden md:inline-flex items-center gap-2 p-2 rounded hover:bg-white/5 transition">
                <User className="w-5 h-5" />
                <span className="text-sm">Mi cuenta</span>
              </Link>

              <Link href="/suscribete" className="hidden lg:inline-flex bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                Suscribite
              </Link>

              <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded hover:bg-white/5 transition" aria-label="Abrir menú">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH MEGA MENU (overlay) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute left-0 top-full w-screen z-40"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="w-full bg-[#070707] border-t border-white/6 shadow-2xl">
                <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* left: mega categories (4 cols on lg) */}
                  <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Categorías Populares</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li><Link href="/categoria/ropa" className="block p-2 rounded hover:bg-[#0b0b0b]">Ropa</Link></li>
                        <li><Link href="/categoria/tecnologia" className="block p-2 rounded hover:bg-[#0b0b0b]">Tecnología</Link></li>
                        <li><Link href="/categoria/accesorios" className="block p-2 rounded hover:bg-[#0b0b0b]">Accesorios</Link></li>
                        <li><Link href="/ofertas" className="block p-2 rounded hover:bg-[#0b0b0b]">Ofertas</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Guías y Tops</h3>
                      <ul className="flex flex-col gap-2 text-sm">
                        <li><Link href="/guia/tallas" className="hover:text-white">Cómo elegir tu talla</Link></li>
                        <li><Link href="/guia/cuidado" className="hover:text-white">Cuidado del producto</Link></li>
                        <li><Link href="/blog/lo-mas-vendido" className="hover:text-white">Lo más vendido</Link></li>
                      </ul>
                    </div>
                  </div>

                  {/* center/right: products grid (8 cols on lg) */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.slice(0, 8).map((p) => (
                      <Link key={p.id} href={p.href} className="group block rounded-lg overflow-hidden bg-gradient-to-br from-[#0b0b0b] to-[#050505] shadow hover:scale-[1.01] transition-transform">
                        <div className="relative h-44 md:h-40 lg:h-36">
                          <img src={p.image} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-semibold text-gray-200">{p.title}</div>
                          {p.price && <div className="text-sm text-red-400 mt-1">{p.price}</div>}
                        </div>
                      </Link>
                    ))}

                    {/* banner card occupying full grid width on small */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                      <Link href="/coleccion/featured" className="block rounded-lg overflow-hidden relative">
                        <img src="https://via.placeholder.com/1200x420?text=Promo+Banner" alt="Promo" className="w-full h-44 object-cover rounded-lg" />
                        <div className="absolute left-6 top-6">
                          <div className="bg-black/60 px-4 py-2 rounded text-white font-semibold">Promoción Exclusiva</div>
                          <div className="mt-2 text-xl font-bold text-white">Hasta 50% OFF · Tiempo limitado</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#050505] p-6 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="font-bold text-lg">AVG CONNECTS</Link>
                <button onClick={() => setMobileOpen(false)} className="p-2"><X className="w-6 h-6" /></button>
              </div>

              <div className="mb-4">
                <input placeholder="Buscar..." className="w-full bg-[#0b0b0b] rounded-full py-2 pl-10 pr-3" />
              </div>

              <nav className="flex flex-col gap-2">
                <details className="group border-b border-white/6 py-2"><summary className="flex justify-between items-center cursor-pointer">Colecciones <ChevronDown className="w-4 h-4" /></summary>
                  <div className="mt-2 pl-3 flex flex-col gap-2">
                    {products.slice(0,6).map(p => <Link key={p.id} href={p.href} className="py-2">{p.title}</Link>)}
                  </div>
                </details>

                <Link href="/ofertas" className="py-3">Ofertas</Link>
                <Link href="/blog" className="py-3">Blog</Link>
                <Link href="/mi-cuenta" className="py-3">Mi cuenta</Link>
                <Link href="/carrito" className="py-3">Carrito ({cartCount})</Link>
              </nav>

              <div className="pt-6 border-t border-white/6 mt-6">
                <Link href="/suscribete" className="block bg-red-600 text-white text-center py-2 rounded-full font-semibold">Suscribite</Link>
                <div className="mt-4 text-xs text-gray-400">Soporte · Términos · Política de privacidad</div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
