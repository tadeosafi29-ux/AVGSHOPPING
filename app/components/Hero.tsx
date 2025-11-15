import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center h-screen bg-gradient-to-br from-blackbrand via-[#111111] to-blackbrand overflow-hidden">
      
      {/* Glow / efecto luces flotantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-72 h-72 bg-pinkbrand/20 rounded-full -top-24 -left-24 blur-3xl animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-pinkbrand/10 rounded-full -bottom-32 right-0 blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Contenido central */}
      <h1 className="relative hero-title mb-6 text-6xl md:text-8xl drop-shadow-[0_10px_30px_rgba(255,0,153,0.8)]">
        Conecta con tus clientes, potencia tus ventas
      </h1>

      <p className="relative hero-text text-gray-300 max-w-3xl text-lg md:text-xl mb-12">
        AVG CONNECTS te ofrece estrategias digitales efectivas para mostrar tus productos y servicios, captar clientes y aumentar tus ingresos. Todo diseñado para escalar tu negocio y atraer clientes premium.
      </p>

      <Link href="/suscribete" className="btn-pink relative z-10">
        ¡Comenzar ahora!
      </Link>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-10 animate-bounce">
        <div className="w-6 h-6 border-2 border-pinkbrand rounded-full mx-auto"></div>
      </div>
    </section>
  );
}
