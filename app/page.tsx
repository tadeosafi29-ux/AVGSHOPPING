// app/page.tsx
import Link from "next/link";

const products = [
  { id: 1, name: "Video Análisis EURUSD", price: 20, img: "/images/euro.png" },
  { id: 2, name: "Mini Estrategia Scalping", price: 15, img: "/images/scalping.png" },
  { id: 3, name: "Señales Diario XAUUSD", price: 25, img: "/images/gold.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12 p-6">
      {/* Hero Section */}
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold mb-4">¡Multiplica tus ganancias con AVG Connects!</h1>
        <p className="text-lg mb-6">Accede a análisis, estrategias y resultados probados para operar con éxito.</p>
        <a 
          href="https://wa.me/5491123456789?text=Hola,+quiero+más+info+sobre+AVG+Connects" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          Contáctanos por WhatsApp
        </a>
      </section>

      {/* Productos Destacados */}
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img src={product.img} alt={product.name} className="w-40 h-40 object-contain mb-4" />
            <h2 className="font-bold text-xl mb-2">{product.name}</h2>
            <p className="text-lg mb-4">${product.price}</p>
            <a 
              href={`https://wa.me/5491123456789?text=Hola,+quiero+más+info+sobre+${encodeURIComponent(product.name)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Consultar
            </a>
          </div>
        ))}
      </section>

      {/* Resultados / Testimonios */}
      <section className="w-full max-w-4xl text-center mt-12">
        <h2 className="text-3xl font-bold mb-6">Resultados que hablan por sí mismos</h2>
        <p>“Gracias a AVG Connects aumenté mis ganancias mensuales un 60%. ¡Recomendado!”</p>
        <p className="mt-2">– Juan P., Trader profesional</p>
      </section>
    </div>
  );
}
