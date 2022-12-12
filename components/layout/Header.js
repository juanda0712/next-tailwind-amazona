import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../utils/Store';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from '../DropdownLink';
import Cookies from 'js-cookie';

export default function Header() {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(
      cartItems.reduce((result, item) => result + item.quantity, 0)
    );
  }, [cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    const reset = { type: 'CART_RESET' };
    dispatch(reset);
    signOut({ callbackUrl: '/login' });
  };
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
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {status === 'loading' ? (
              'Loading'
            ) : session?.user ? (
              <Menu as="div" className="relatine inline-block">
                <Menu.Button className="text-blue-600">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/order-history"
                    >
                      Order History
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/login" className="p-2">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
