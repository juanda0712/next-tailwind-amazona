import Link from 'next/link';
import { useContext } from 'react';
import CartItems from '../components/CartItems';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
export default function Cart() {
  const { state } = useContext(Store);
  const { cartItems } = state.cart;

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-lg">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <CartItems cartItems={cartItems} />
      )}
    </Layout>
  );
}
