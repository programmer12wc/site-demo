import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { CartProvider } from "react-use-cart";
import "swiper/css";

export default function App({ Component, pageProps }) {
  return (
    <div className="app-container">
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
}
