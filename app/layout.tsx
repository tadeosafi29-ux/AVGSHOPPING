import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AVG Connects',
  description: 'Potenciamos tu negocio con estrategias digitales de alto impacto.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-blackbrand text-gray-100 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
