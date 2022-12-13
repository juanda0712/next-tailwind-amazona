import Layout from '../../components/Layout';
import Link from 'next/link';
import ProductView from '../../components/ProductView';
import db from '../../utils/db';
import Product from '../../models/Product';

export default function ProductScreen({ product }) {
  if (!product) {
    return <Layout title="Not Found">Product Not Found</Layout>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <ProductView product={product} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
