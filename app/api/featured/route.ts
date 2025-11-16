import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: '1', title: 'Zapatillas AirX', href: '/p/airx', image: 'https://via.placeholder.com/1200x800?text=AirX', price: '$129' },
    { id: '2', title: 'Chaqueta Pro', href: '/p/chaqueta-pro', image: 'https://via.placeholder.com/1200x800?text=Chaqueta+Pro', price: '$199' },
    { id: '3', title: 'Reloj SmartX', href: '/p/smartx', image: 'https://via.placeholder.com/1200x800?text=SmartX', price: '$249' },
    { id: '4', title: 'Auriculares AirBeat', href: '/p/airbeat', image: 'https://via.placeholder.com/1200x800?text=AirBeat', price: '$99' },
    { id: '5', title: 'Mochila Voyager', href: '/p/mochila', image: 'https://via.placeholder.com/1200x800?text=Mochila', price: '$79' },
    { id: '6', title: 'Gorra Snap', href: '/p/gorra', image: 'https://via.placeholder.com/1200x800?text=Gorra', price: '$19' },
    { id: '7', title: 'Socks Pro', href: '/p/socks', image: 'https://via.placeholder.com/1200x800?text=Socks', price: '$9' },
    { id: '8', title: 'Lentes Sun', href: '/p/lentes', image: 'https://via.placeholder.com/1200x800?text=Lentes', price: '$49' },
  ]);
}
