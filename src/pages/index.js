import Hero from "@/components/Hero";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Topdownloads from "@/components/top-downloads/top-downloads";
import Head from "next/head";

export default function Home() {
  let sec = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "site-demo",
      alternateName: "site-demo",
      url: "https://site-demo-nine.vercel.app",
      logo: "https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png",
      sameAs: ["https://site-demo-nine.vercel.app"],
    },
  ];
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home_des" />
        <link
          rel="canonical"
          href={`"https://site-demo-nine.vercel.app/`}
        />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content="https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png"
        />
        <meta property="og:image:alt" content="Blue" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="Home_des" />
        <meta
          property="og:url"
          content="https://site-demo-nine.vercel.app/"
        />
        <meta property="og:site_name" content="site-demo" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="506" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png"
        />
        <meta property="twitter:title" content="Home" />
        <meta property="twitter:description" content="Home_des" />
        <meta property="twitter:site" content="@site-Demo" />
        <meta property="twitter:creator" content="@site-Demo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sec),
          }}
        />
      </Head>
      <Header />
      <Topdownloads />
      <Footer />
    </>
  );
}
