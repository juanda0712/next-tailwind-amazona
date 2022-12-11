import Image from 'next/image';

export default function ProductView({ product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3">
      <div className="md:col-span-2">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          layout="responsive"
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
          <button className="primary-button w-full">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
