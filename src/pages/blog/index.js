import BlogGrid from "@/components/blog-grid/blog-grid.component";
import Header from "@/components/header/header";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [nextpage, setNextpage] = useState(1);
  const [blogs, setBlogs] = useState([]);

  const blogs_list = () => {
    axios
      .get("https://www.amiiboapi.com/api/amiibo")
      .then((response) => {
        if (response.data) {
          // console.log(response.data);
          setBlogs(response.data.amiibo);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function Items({ currentItems }) {
    return (
      <div className="flex items-center flex-wrap  font-normal">
        <div className="flex items-center mr-2 mb-6">
          {currentItems &&
            currentItems.map((pro, index) => {
              return (
                <React.Fragment key={index}>
                  <BlogGrid data={pro} />
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = blogs.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(blogs.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % blogs.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel={<i className="fa-solid fa-angles-right"></i>}
          previousLabel={<i className="fa-solid fa-angles-left"></i>}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center sm:gap-2 mt-10"
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageClassName=""
          forcePage={parseInt(nextpage) - 1}
          pageLinkClassName="text-green-900 text-lg font-semibold h-10 w-10 flex items-center justify-center rounded-md hover:bg-yellow-900"
          activeClassName="rounded-md bg-yellow-900"
        />
      </>
    );
  }

  useEffect(() => {
    blogs_list();
  }, []);

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
        }
      ],
    }
  ];

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="blog_des" />
        <link
          rel="canonical"
          href={`"https://site-demo-nine.vercel.app/blog`}
        />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content="https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png"
        />
        <meta property="og:image:alt" content="Blue" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog" />
        <meta property="og:description" content="blog_des" />
        <meta
          property="og:url"
          content="https://site-demo-nine.vercel.app/blog"
        />
        <meta property="og:site_name" content="site-demo" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="506" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://site-demo-nine.vercel.app/assets/logo/Blue_Logo.png"
        />
        <meta property="twitter:title" content="Blog" />
        <meta property="twitter:description" content="blog_des" />
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
      <div className="px-0 1xl:px-10">
        <section className="bg-green-100 pt-8 pb-12 sm:py-12 text-center sm:text-left rounded-b-4xl sm:rounded-b-5xl">
          <div className="container mx-auto sm:px-8 px-4">
            <div className="flex flex-wrap items-center ">
              <div className="w-full order-2 lg:order-1  flex flex-wrap">
                <div className="w-full lg:w-2/4 lg:pr-4 pr-0">
                  <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight">
                    Blog & News
                  </h1>
                </div>
                <p className="text-md sm:text-lg">
                  Embark on a journey of learning, inspiration, and innovation
                  with our expertly crafted blog content.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="pb-12">
        <div className="container mx-auto">
          <PaginatedItems itemsPerPage={9} />,
        </div>
      </section>
    </>
  );
}
