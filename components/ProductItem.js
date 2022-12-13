import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../utils/Store';

export default function ProductItem({ product }) {
  const { name, slug, image, price, brand } = product;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCardHandler = async () => {
    const existItem = cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (existItem && quantity > data.countInStock) {
      return toast.error('Sorry. Product out of stock');
    }

    const update = {
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    };
    dispatch(update);
    toast.success('Product added to the cart');
  };
  return (
    <div className="card">
      <Link href={`/product/${slug}`} className="flex justify-center">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="rounded shadow "
        ></Image>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${slug}`}>
          <h2 className="text-lg ">{name}</h2>
        </Link>
        <p className="mb-2">{brand}</p>
        <p className="mb-2">${price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCardHandler()}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
