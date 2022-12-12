import Image from 'next/image';
import Link from 'next/link';

export default function ProductItem({ product }) {
  const { name, slug, image, price, brand } = product;
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
        <button className="primary-button">Add to Cart</button>
      </div>
    </div>
  );
}
