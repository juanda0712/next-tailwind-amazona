import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductView({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const addToCardHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (existItem && quantity > data.countInStock) {
      return toast.error('Sorry. Product is out of stock');
    }

    const update = {
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    };
    dispatch(update);
    router.push('/cart');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3">
      <div className="md:col-span-2">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
        />
      </div>
      <div>
        <ul>
          <li>
            <h1 className="text-lg">{product.name}</h1>
          </li>
          <li>Category: {product.category}</li>
          <li>Brand: {product.brand}</li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>{product.description}</li>
        </ul>
      </div>
      <div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
          </div>
          <button
            className="primary-button w-full"
            onClick={() => addToCardHandler()}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
