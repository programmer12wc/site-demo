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
  const { pathname } = location;
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

  // const single_blog = () => {
  //   axios
  //     .get(`https://amiiboapi.com/api/amiibo/?character=${current_url}`)
  //     .then((response) => {
  //       if (response.data) {
  //         set_b_name(response.data.amiibo[0].character);
  //         set_b_slug(response.data.amiibo[0].character);
  //         set_b_seo_title(response.data.amiibo[0].name);
  //         set_b_seo_description(response.data.amiibo[0].gameSeries);
  //         set_b_image_url(response.data.amiibo[0].image);
  //         set_created_at(response.data.amiibo[0].release.au);
  //         set_updated_at(response.data.amiibo[0].release.jp);
  //         setSingleblogs(response.data.amiibo[0]);

  //         const product_id = response.data.amiibo[0].head;
  //         if (product_id) {
  //           set_refrence_desc(response.data.amiibo[0].gameSeries);
  //           set_refrence_title(response.data.amiibo[0].character);
  //         }
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

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
          url: "https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png",
        },
      },
      datePublished: `${created_at}`,
      dateModified: `${updated_at}`,
    },
  ];

  useEffect(() => {
    const single_blog = async () => {
      try {
        const response = await axios.get(
          `https://amiiboapi.com/api/amiibo/?character=${current_url}`
        );
        if (response.data && response.data.amiibo.length > 0) {
          const { amiibo } = response.data;
          const blogData = amiibo[0];
          setSingleblogs(blogData);
          set_b_name(blogData.character);
          set_b_slug(blogData.character);
          set_b_seo_title(blogData.name);
          set_b_seo_description(blogData.gameSeries);
          set_b_image_url(blogData.image);
          set_created_at(blogData.release.au);
          set_updated_at(blogData.release.jp);
          set_refrence_desc(blogData.gameSeries);
          set_refrence_title(blogData.character);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Check if current_url is defined and not empty
    if (current_url) {
      single_blog();
    }
  }, [current_url]);

  // useEffect(() => {
  // const id = location.query.id;
  // if (id) {
  //   single_blog(id);
  // }
  // }, [location]);

  return (
    <>
      {Object.keys(singleblogs).length > 0 && current_url && (
        <>
          <Head>
            <title>{b_seo_title}</title>
            <meta name="description" content={b_seo_description} />
            <link
              rel="canonical"
              href={`https://site-demo-nine.vercel.app/${
                pathname.split("/")[1]
              }/${current_url}`}
            />
            <meta property="og:locale" content="en_US" />
            <meta property="og:image" content={b_image_url} />
            <meta property="og:image:alt" content={b_name} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={b_seo_title} />
            <meta property="og:description" content={b_seo_description} />
            <meta
              property="og:url"
              content={`https://site-demo-nine.vercel.app/${
                pathname.split("/")[1]
              }/${current_url}`}
            />
            <meta property="og:site_name" content="website" />
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
          <div className="blog-single">
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
                              href={"/" + pathname.split("/")[1]}
                              className="hover:text-yellow-900"
                              style={{ textTransform: "capitalize" }}
                            >
                              {pathname.split("/")[1]}
                            </Link>
                          </li>
                          <li
                            className="breadcrumb-item active text-gray-100 flex sm:block hidden"
                            aria-current="page"
                          >
                            <span className="">{current_url}</span>
                          </li>
                        </ul>
                      </nav>
                      <div className="flex items-center flex-wrap gap-1 justify-center sm:justify-start"></div>
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
                    src={singleblogs.image}
                    alt={singleblogs.name}
                    title={singleblogs.type}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 lg:top-1/2 lg:-translate-y-1/2 lg:right-[-2px] right-[0px] w-full lg:w-auto 2xl:-right-16"></div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
