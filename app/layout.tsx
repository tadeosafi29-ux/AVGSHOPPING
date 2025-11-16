import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'AVG Connects',
  description: 'Ecommerce top mundial',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white font-sans">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-black border-t border-white/10 mt-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <span>© 2025 AVG Connects. Todos los derechos reservados.</span>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="/terminos" className="hover:text-white transition">Términos</a>
              <a href="/privacidad" className="hover:text-white transition">Privacidad</a>
              <a href="/contacto" className="hover:text-white transition">Contacto</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
