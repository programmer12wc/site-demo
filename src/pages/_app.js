import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { CartProvider } from "react-use-cart";
import Head from "next/head";
import "swiper/css";

export default function App({ Component, pageProps }) {
  return (
    <Head>
    <meta name="google-site-verification" content="7vBcpD4vU43j0H-JmisE6HiwfngtaXBTv7rz5maRciQ" />
    </Head>
    <div className="app-container">
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
}
