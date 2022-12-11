import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../../utils/Store';

export default function Header() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <header>
        <nav className="flex h-12 justify-between px-4 shadow-md">
          <Link href="/" className="text-lg font-bold">
            Amazona
          </Link>
          <div>
            <Link href="/cart" className="p-2">
              Cart
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cart.cartItems.reduce(
                    (result, item) => result + item.quantity,
                    0
                  )}
                </span>
              )}
            </Link>
            <Link href="/login" className="p-2">
              Login
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
