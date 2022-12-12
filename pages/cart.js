import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { XCircleIcon } from '@heroicons/react/24/outline';
export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-lg">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <il>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce(
                    (result, item) => result + item.quantity,
                    0
                  )}
                  ) :{' '}
                  {cartItems.reduce(
                    (result, item) => result + item.quantity * item.price,
                    0
                  )}
                </div>
              </il>
              <li>
                <div className="primary-button w-full text-center">
                  <Link href="/shipping" className="">
                    Check Out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
