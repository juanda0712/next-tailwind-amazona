import Head from 'next/head';
import Header from './layout/Header';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta
          name="description"
          content="Ecommerce Web Page created with Nextjs"
        />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Header></Header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright ©️ 2022 Amazona
        </footer>
      </div>
    </>
  );
}
