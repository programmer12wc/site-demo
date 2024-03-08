import Header from "@/components/header/header";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Str_replace_with_space = (value) => {
  const substring = "-";
  let value_name = "";
  if (value) {
    if (value.includes(substring)) {
      value_name = value.replace(/-/g, " ");
    } else {
      value_name = value;
    }
  }
  return value_name;
};

export default function Home() {
  const location = useRouter();
  const { asPath } = location;
  const current_url = location.query.id;

  const [singleblogs, setSingleblogs] = useState([]);
  const [b_name, set_b_name] = useState("");
  const [b_slug, set_b_slug] = useState("");
  const [b_image_url, set_b_image_url] = useState("");
  const [b_seo_title, set_b_seo_title] = useState("");
  const [b_seo_description, set_b_seo_description] = useState("");
  const [created_at, set_created_at] = useState("");
  const [updated_at, set_updated_at] = useState("");
  const [product_slug, set_product_slug] = useState("");
  const [refrence_desc, set_refrence_desc] = useState("");
  const [refrence_title, set_refrence_title] = useState("");

  const [copied, set_copied] = useState(false);

  const single_blog = () => {
    let params = {
      token: "A5HFstrolor3upoitxdsqzwod8t7U",
      blog_id: location.query.id,
      blgType: 2,
    };
    axios
      .post("https://api.webbytemplate.com/v1/test-single-blog", params)
      .then((response) => {
        if (response.data.result === true) {
          console.log(response.data.blogs);
          setSingleblogs(response.data.blogs);
          set_b_name(response.data.blogs.name);
          set_b_slug(response.data.blogs.slug);
          set_b_seo_title(response.data.blogs.seo_title);
          set_b_seo_description(response.data.blogs.seo_description);
          set_b_image_url(response.data.blogs.image_url);
          set_created_at(response.data.blogs.created_date);
          set_updated_at(response.data.blogs.updated_date);

          const product_id = response.data.blogs.product_id;
          if (product_id) {
            single_product(response.data.blogs.product_id);
            set_refrence_desc(response.data.blogs.refrence_desc);
            set_refrence_title(response.data.blogs.refrence_title);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let sec = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "site-demo",
      alternateName: "site-demo",
      url: "https://site-demo-nine.vercel.app",
      logo: "https://site-demo-nine.vercel.app/assets/logo/logo.svg",
      sameAs: ["https://site-demo-nine.vercel.app"],
    },
    {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://site-demo-nine.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://site-demo-nine.vercel.app/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${b_name}`,
          item: `https://site-demo-nine.vercel.app/blog/${b_slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://site-demo-nine.vercel.app/blog/${b_slug}`,
      },
      headline: `${b_seo_title}`,
      description: `${b_seo_description}`,
      image: `${b_image_url}`,
      author: {
        "@type": "Organization",
        name: "site-demo",
      },
      publisher: {
        "@type": "Organization",
        name: "site-demo",
        logo: {
          "@type": "ImageObject",
          url: "https://site-demo-nine.vercel.app/assets/logo/logo.svg",
        },
      },
      datePublished: `${created_at}`,
      dateModified: `${updated_at}`,
    },
  ];

  useEffect(() => {
    const id = location.query.id;
    if (id) {
      single_blog(id);
    }
  }, [location]);

  return (
    <>
      {/* <Head
        title={b_seo_title}
        meta={[
          { name: "description", content: b_seo_description },
          { property: "og:locale", content: "en_US" },
          { property: "og:type", content: "website" },
          { property: "og:title", content: b_seo_title },
          { property: "og:description", content: b_seo_description },
          {
            property: "og:url",
            content: "https://site-demo-nine.vercel.app/blog/" + b_slug,
          },
          { property: "og:site_name", content: "site-Demo" },
          { property: "og:image", content: b_image_url },
          { property: "og:image:alt", content: b_name },
          { property: "og:image:width", content: "900" },
          { property: "og:image:height", content: "506" },
          { property: "twitter:card", content: "summary_large_image" },
          { property: "twitter:image", content: b_image_url },
          { property: "twitter:title", content: b_seo_title },
          { property: "twitter:description", content: b_seo_description },
          { property: "twitter:site", content: "@site-Demo" },
          { property: "twitter:creator", content: "@site-Demo" },
        ]}
        script={[
          {
            name: "BreadcrumbList",
            type: "application/ld+json",
            innerHTML: `
            {
            "@context": "https://schema.org/", 
            "@type": "BreadcrumbList", 
            "itemListElement": [{
              "@type": "ListItem", 
              "position": 1, 
              "name": "Home",
              "item": "https://site-demo-nine.vercel.app"  
            },{
              "@type": "ListItem", 
              "position": 2, 
              "name": "Blog",
              "item": "https://site-demo-nine.vercel.app/blog"  
            },{
              "@type": "ListItem", 
              "position": 3, 
              "name": "${b_name}",
              "item": "https://site-demo-nine.vercel.app/blog/${b_slug}"  
            }]
          }
          `,
          },
          {
            name: "Blog",
            type: "application/ld+json",
            innerHTML: `
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://site-demo-nine.vercel.app/blog/${b_slug}"
              },
              "headline": "${b_seo_title}",
              "description": "${b_seo_description}",
              "image": "${b_image_url}",  
              "author": {
                "@type": "Organization",
                "name": "site-Demo"
              },  
              "publisher": {
                "@type": "Organization",
                "name": "site-Demo",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://site-demo-nine.vercel.app/assets/logo/site-Demo-logo.svg"
                }
              },
              "datePublished": "${created_at}",
              "dateModified": "${updated_at}"
            }
          `,
          },
        ]}
      /> */}

      <Head>
        <title>{b_seo_title}</title>
        <meta name="description" content={b_seo_description} />
        <link
          rel="canonical"
          href={`"https://site-demo-nine.vercel.app/blog/"${current_url}`}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={b_image_url} />
        <meta property="og:image:alt" content={b_name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={b_seo_title} />
        <meta property="og:description" content={b_seo_description} />
        <meta
          property="og:url"
          content={"https://site-demo-nine.vercel.app/blog/" + b_slug}
        />
        <meta property="og:site_name" content="site-demo" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="506" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={b_image_url} />
        <meta property="twitter:title" content={b_seo_title} />
        <meta property="twitter:description" content={b_seo_description} />
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

      {/* {singleblogs &&
        singleblogs.map((singleblogs, index) => {
          return ( key={index} */}
      <div  className="blog-single">
        <div className="px-0 1xl:px-10">
          <section className="bg-green-100 pb-20 pt-8 sm:pt-12 sm:pb-28 text-center sm:text-left rounded-b-4xl sm:rounded-b-5xl ">
            <div className="container mx-auto px-0">
              <div className="max-w-[900px]  mx-auto px-6 sm:px-6 ">
                <div className="flex flex-wrap items-center justify-center sm:justify-between  mb-5 lg:gap-4 lg:gap-6 gap-3 ">
                  <nav aria-label="breadcrumb" className="sm:w-auto w-full">
                    <ul className="breadcrumb text-sm text-light text-green-800 flex justify-center sm:justify-start flex-wrap ">
                      <li className="breadcrumb-item mr-2">
                        <Link
                          name="breadcrumb"
                          href="/"
                          className="hover:text-yellow-900"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="breadcrumb-item mr-2">
                        <Link
                          name="breadcrumb"
                          href={"/" + current_url}
                          className="hover:text-yellow-900"
                          style={{ textTransform: "capitalize" }}
                        >
                          {current_url}
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active text-gray-100 flex sm:block hidden"
                        aria-current="page"
                      >
                        <span className="">{singleblogs.name}</span>
                      </li>
                    </ul>
                  </nav>
                  <div className="flex items-center flex-wrap gap-1 justify-center sm:justify-start">
                    <div className="text-sm sm:text-md font-normal mr-2 flex items-center">
                      <span className="mr-2">
                        <img
                          src="/assets/img/calendar-clock-outline.svg"
                          alt="calendar"
                          title="calendar"
                        />
                      </span>{" "}
                      {Str_replace_with_space(singleblogs.date)}
                    </div>
                    <Link
                      name="blog-category"
                      href={`/blog/category/${singleblogs.category_slug}`}
                      className="uppercase text-sm text-green-800 font-bold before:w-[5px] before:h-[5px] before:bg-green-800 before:rounded-full before:mr-2 flex items-center hover:text-yellow-900"
                      style={{ textTransform: "capitalize" }}
                    >
                      {Str_replace_with_space(singleblogs.category_slug)}
                    </Link>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl 2xl:text-4xl text-green-900 font-bold leading-tight my-2 sm:my-0 mt-2">
                  {singleblogs.name}
                </h1>
              </div>
            </div>
          </section>
        </div>

        <section className="mb-5 lg:mb-10  -mt-14 lg:-mt-20 container mx-auto px-0">
          <div className="mx-auto relative max-w-[900px] px-6 sm:px-6 ">
            <div className="overflow-hidden before:block bg-white w-full h-full before:pt-[75%] sm:before:pt-[43%] relative rounded-4xl sm:rounded-[50px] lg:min-h-[450px] min-h-auto ">
              <img
                src={singleblogs.image_url}
                alt={singleblogs.image_name}
                title={singleblogs.image_name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 lg:top-1/2 lg:-translate-y-1/2 lg:right-[-2px] right-[0px] w-full lg:w-auto 2xl:-right-16">
              <ul className="flex flex-wrap gap-2 sm:gap-5 justify-center lg:max-w-[48px] w-full">
                <li>
                  <a
                    name="facebook"
                    href={
                      "https://www.facebook.com/sharer.php?u=" +
                      "https://site-demo-nine.vercel.app" +
                      current_url
                    }
                    target="_blank"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="twitter"
                    href={
                      "https://twitter.com/intent/tweet?text=" +
                      "https://site-demo-nine.vercel.app" +
                      current_url
                    }
                    target="_blank"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="whatsapp"
                    href={
                      "https://api.whatsapp.com/send?text=" +
                      "https://site-demo-nine.vercel.app" +
                      current_url
                    }
                    target="_blank"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="linkedin"
                    href={
                      "https://www.linkedin.com/shareArticle?url=" +
                      "https://site-demo-nine.vercel.app" +
                      current_url
                    }
                    target="_blank"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    name="pinterest"
                    href={
                      "https://pinterest.com/pin/create/button/?url==" +
                      "https://site-demo-nine.vercel.app" +
                      current_url +
                      "&media=" +
                      b_image_url +
                      "&description=" +
                      b_name
                    }
                    target="_blank"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white"
                  >
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <span
                    name="copy"
                    className="text-green-800 bg-green-300 w-9 h-9 block flex items-center justify-center rounded-full text-lg hover:bg-green-800 hover:text-white cursor-pointer"
                  >
                    <CopyToClipboard
                      text={"https://site-demo-nine.vercel.app" + current_url}
                      onCopy={() => set_copied_fun()}
                    >
                      <span>
                        <i className="fa-solid fa-copy"></i>
                        {copied ? (
                          <span className="tooltip">Link Copied !</span>
                        ) : null}
                      </span>
                    </CopyToClipboard>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="pb-20 lg:pt-0 pt-8 container mx-auto px-0">
          <div className="mx-auto max-w-[900px]  sm:px-6 px-6">
            <div
              dangerouslySetInnerHTML={{ __html: singleblogs.description }}
              className="w-log-des"
            ></div>
            {product_slug ? (
              <div className="bg-green-800 md:flex text-center md:text-left items-center relative justify-between py-8 sm:py-12 px-5 sm:px-9 sm:pr-12 rounded-4xl overflow-hidden mt-12">
                <div className="absolute -top-1/2 -right-48 h-full">
                  <img
                    src="/assets/img/template-shape-line.png"
                    alt=""
                    className=""
                  />
                </div>
                <div className="w-full md:pr-10 mb-6 md:mb-0 relative z-1">
                  <h3 className="text-white font-bold text-xl 2xl:text-3xl md:text-[35px] mb-3 leading-tight">
                    {refrence_title}
                  </h3>
                  <p className="text-white max-w-lg sm:text-lg text-md mb-2">
                    {refrence_desc}
                  </p>
                </div>
                <Link
                  name="view_shop"
                  href={`/product/${product_slug}`}
                  className="all-btn mx-auto md:m-0 shrink-0 relative z-1 px-10"
                >
                  View Shop{" "}
                  <i className="fa-solid fa-arrow-right-long ml-2"></i>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
      {/* );
        })} */}
    </>
  );
}
