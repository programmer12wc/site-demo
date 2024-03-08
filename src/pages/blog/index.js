import BlogsGrid from "@/components/blog-grid/blog-grid.component";
import DummyblogGrid from "@/components/blog-grid/skeleton-blog-grid";
import Header from "@/components/header/header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

export default function Home() {
  const location = useRouter();
  const { pathname } = location;
  const current_url = pathname.split("/");

  const [latestBlogs, setLatestBlogs] = useState([]);
  const [uppder_blog_section, set_uppder_blog_section] = useState("show");
  const [showDummyBlogs, setShowDummyBlogs] = useState(true);
  const [nextpage, setNextpage] = useState(1);
  const [blogs_status, set_blogs_status] = useState("show-items");
  const [original_items_status, set_original_items_status] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [blogs_total, set_blogs_total] = useState(0);
  const [result_count, set_result_count] = useState(0);

  const latest_blogs = () => {
    let params = {
      token: "A5HFstrolor3upoitxdsqzwod8t7U",
      orderby: "date",
      blgType: 1,
      per_page: 3,
    };
    axios
      .post("https://api.webbytemplate.com/v1/test-blog", params)
      .then((response) => {
        if (response.data.result === true) {
          setLatestBlogs(response.data.blogs);
          setShowDummyBlogs(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const blogs_list = (perpage, pageno) => {
    set_original_items_status(0);
    set_blogs_status("show-items");

    let params = {
      token: "A5HFstrolor3upoitxdsqzwod8t7U",
      blgType: 1,
      per_page: perpage,
      page_no: pageno,
    };
    axios
      .post("https://api.webbytemplate.com/v1/test-blog", params)
      .then((response) => {
        if (response.data.result === true) {
          const results = response.data.blogs;
          if (results.length === 0) {
            set_result_count(1);
          }
          setBlogs(response.data.blogs);
          set_blogs_status("hidden-items");
          set_original_items_status(1);
          set_blogs_total(response.data.total);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const breadcrumb_menu = (url) => {
    if (url) {
      return (
        <nav aria-label="breadcrumb" className="mb-3 sm:mb-5">
          <ul className="breadcrumb text-sm text-light text-green-800 flex items-center justify-center sm:justify-start ">
            <li className="breadcrumb-item mr-2">
              <Link name="home" href="/" className="hover:text-yellow-900 ">
                Home
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-gray-100"
              style={{ textTransform: "capitalize" }}
            >
              {breadcrumb_menu_title(url)}
            </li>
          </ul>
        </nav>
      );
    }
  };

  const breadcrumb_menu_title = (url) => {
    return url.replace("-", " ");
  };

  const original_items = (currentItems) => {
    if (original_items_status === 1) {
      if (currentItems && currentItems.length !== 0) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 category blogs-list">
            {currentItems &&
              currentItems.map((pro, index) => {
                return <BlogsGrid key={index} blog={pro} />;
              })}
          </div>
        );
      } else {
        if (result_count === 1) {
          return (
            <div className="text-lg md:text-3xl text-green-900 text-center font-semibold">
              No Items Found
            </div>
          );
        }
      }
    }
  };

  function Items({ currentItems }) {
    return (
      <>
        {original_items(currentItems)}
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 blogs-list dummy-blogs " +
            blogs_status
          }
        >
          {/* <Dummyblosrc/pages/blog/index.js/> */}
        </div>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
      setCurrentItems(blogs);
      setPageCount(Math.ceil(blogs_total / itemsPerPage));
    }, [nextpage, itemsPerPage]);

    const handlePageClick = (event) => {
      const nextspage = parseInt(event.selected) + 1;
      if (nextspage > 1) {
        set_uppder_blog_section("hidden");
      } else {
        set_uppder_blog_section("show");
      }
      setNextpage(nextspage);
      $(window).scrollTop(0);
      blogs_list(9, nextspage);
    };
    const showPagination = (pageCount) => {
      if (pageCount > 1) {
        return (
          <ReactPaginate
            breakLabel="..."
            nextLabel=<i className="fa-solid fa-angles-right"></i>
            onPageChange={handlePageClick}
            containerClassName="flex items-center justify-center sm:gap-2 mt-10"
            pageCount={pageCount}
            previousLabel=<i className="fa-solid fa-angles-left"></i>
            renderOnZeroPageCount={null}
            pageClassName=""
            forcePage={parseInt(nextpage) - 1}
            pageLinkClassName="text-green-900 text-lg font-semibold h-10 w-10 flex items-center justify-center rounded-md hover:bg-yellow-900"
            activeClassName="rounded-md bg-yellow-900"
          />
        );
      }
    };

    return (
      <>
        <Items currentItems={currentItems} />
        {showPagination(pageCount)}
      </>
    );
  }

  const search_filter_tab = () => {
    return <></>;
  };

  useEffect(() => {
    latest_blogs();
    blogs_list(9, nextpage);
  }, []);

  return (
    <>
      <Header />
      <div className="px-0 1xl:px-10">
        <section className="bg-green-100 pt-8 pb-12 sm:py-12 text-center sm:text-left rounded-b-4xl sm:rounded-b-5xl">
          <div className="container mx-auto sm:px-8 px-4">
            <div className="flex flex-wrap items-center ">
              <div className="w-full order-2 lg:order-1  flex flex-wrap">
                <div className="w-full lg:w-2/4 lg:pr-4 pr-0">
                  {breadcrumb_menu(current_url[1])}
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
      <section className="pb-5 sm:pb-9 sm:pt-20 pt-9">
        <div className="container mx-auto  px-4 sm:px-8 ">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold leading-tight mb-0">
            All Blog & News
          </h2>

          {showDummyBlogs && (
            <div className="grid lg:grid-cols-2 md:gap-10 latest-blogs dummy-blogs">
              <div>
                <Skeleton width="100%" height={460} />
              </div>
              <div className="py-3">
                <div className="sm:flex py-3">
                  <div className="w-[48%]">
                    <Skeleton width="100%" height={194} />
                  </div>
                  <div className="p-4 sm:p-6 w-full">
                    <div className="flex items-center mb-2">
                      <Skeleton width="100%" height={20} />
                    </div>
                    <h3 className="text-green-900 font-bold text-xl leading-tight mb-2">
                      <Skeleton width="50%" height={24} />
                    </h3>
                    <Skeleton width="100%" height={48} />
                  </div>
                </div>
                <div className="sm:flex py-3">
                  <div className="w-[48%]">
                    <Skeleton width="100%" height={194} />
                  </div>
                  <div className="p-4 sm:p-6 w-full">
                    <div className="flex items-center mb-2">
                      <Skeleton width="100%" height={20} />
                    </div>
                    <h3 className="text-green-900 font-bold text-xl leading-tight mb-2">
                      <Skeleton width="50%" height={24} />
                    </h3>
                    <Skeleton width="100%" height={48} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={
              "grid lg:grid-cols-2 md:gap-10  latest-blogs " +
              uppder_blog_section
            }
          >
            {latestBlogs &&
              latestBlogs.map((pro, index) => {
                if (index == 0) {
                  return (
                    <div key={pro.id}>
                      <div className="overflow-hidden before:block w-full h-full before:pt-[75%] sm:before:pt-[65%] relative rounded-1xl">
                        <Link
                          name="blog_show"
                          href={`/blog/${pro.slug}`}
                          className="cursor-pointer"
                        >
                          <img
                            src={pro.image_url}
                            alt={pro.image_name}
                            title={pro.image_name}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"
                          />
                        </Link>
                        <div className="transition-all duration-400 absolute bottom-0 left-0 w-full before:h-full before:w-full before:block before:absolute before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-black/60 before:to-black/0">
                          <div className="relative w-full p-5 sm:p-10">
                            <div className="flex items-center mb-2">
                              <div className="text-md font-normal mr-2 flex items-center text-white">
                                <span className="text-xl sm:text-2xl font-bold mr-2">
                                  {pro.blog_day}
                                </span>{" "}
                                {pro.blog_month_year}
                              </div>
                              <span className="uppercase text-sm text-yellow-900 font-bold before:w-[5px] before:h-[5px] before:bg-green-800 before:rounded-full before:mr-2 flex items-center">
                                <Link
                                  name="blog-category"
                                  href={`/blog/category/${pro.category_slug}`}
                                  className="uppercase text-sm hover:text-green-800 font-bold flex items-center text-yellow-900"
                                >
                                  {" "}
                                  {pro.category_name}
                                </Link>
                              </span>
                            </div>
                            <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                              <Link
                                name="blog_view"
                                href={`/blog/${pro.slug}`}
                                className="hover:text-yellow-900"
                              >
                                {pro.name}
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            <div className="py-3">
              {latestBlogs &&
                latestBlogs.map((pro, index) => {
                  if (index == 1 || index == 2) {
                    return (
                      <div className="sm:flex py-3 w-blog" key={pro.id}>
                        <div className="overflow-hidden before:block w-full before:pt-[75%] relative rounded-1xl shrink-0 sm:max-w-[255px]">
                          <Link
                            name="blog_show"
                            href={`/blog/${pro.slug}`}
                            className="cursor-pointer"
                          >
                            <img
                              src={pro.image_url}
                              alt={pro.image_name}
                              title={pro.image_name}
                              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 cursor-pointer"
                            />
                          </Link>
                        </div>
                        <div className="p-4 sm:p-6 w-full">
                          <div className="flex items-center mb-2 flex-wrap">
                            <div className="text-md font-normal mr-2 flex items-center ">
                              <span className="text-xl sm:text-2xl font-bold mr-2">
                                {pro.blog_day}
                              </span>{" "}
                              {pro.blog_month_year}
                            </div>
                            <span className="uppercase text-sm text-yellow-900 font-bold before:w-[5px] before:h-[5px] before:bg-green-800 before:rounded-full before:mr-2 flex items-center">
                              <Link
                                name="blog-category"
                                href={`/blog/category/${pro.category_slug}`}
                                className="uppercase text-sm hover:text-green-800 font-bold flex items-center text-yellow-900"
                              >
                                {" "}
                                {pro.category_name}
                              </Link>
                            </span>
                          </div>
                          <h3 className="text-green-900 font-bold text-xl leading-tight mb-2">
                            <Link
                              name="blog_view"
                              href={`/blog/${pro.slug}`}
                              className="hover:text-yellow-900"
                            >
                              {pro.name}
                            </Link>
                          </h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                pro.seo_description.substring(0, 80) + "...",
                            }}
                          ></p>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto">
          <div className="flex items-center flex-wrap  font-normal">
            <div className="flex items-center mr-2 mb-6">
              {search_filter_tab()}
            </div>
          </div>
          <PaginatedItems itemsPerPage={9} />
        </div>
      </section>
    </>
  );
}
