import Layout from '../../components/Layout';
import data from '../../utils/data';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProductView from '../../components/ProductView';

export default function Product() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <h1>Product Not Exist</h1>;
  }
  return (
    <Layout>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <ProductView product={product} />
    </Layout>
  );
}
