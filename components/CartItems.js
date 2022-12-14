import { XCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../utils/Store';

export default function CartItems({ cartItems }) {
  const { dispatch } = useContext(Store);

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateItemHandler = async (item, newQuantity) => {
    const quantity = Number(newQuantity);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    const update = {
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    };
    dispatch(update);
    toast.success('Product updated in the cart');
  };

  return (
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
                <td className="p-5 text-right">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateItemHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
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
          <li>
            <div className="pb-3 text-xl">
              Subtotal (
              {cartItems.reduce((result, item) => result + item.quantity, 0)}) :{' '}
              {cartItems.reduce(
                (result, item) => result + item.quantity * item.price,
                0
              )}
            </div>
          </li>
          <li>
            <Link
              href="login?redirect=/shipping"
              className="contents text-black"
            >
              <div className="primary-button w-full text-center">Check Out</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
