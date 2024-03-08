import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Categorymenu from "./category-menu.component";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
  const { pathname } = router;
  const current_url = pathname.split("/");
  const [productSearch, setproductSearch] = useState("");
  const [parent_category_title, set_parent_category_title] = useState("");
  const [sub_category_title, set_sub_category_title] = useState("");

  let search_url = "";

  if (pathname.includes("category")) {
    search_url = pathname.replace("/category", "");
    search_url = search_url.trim();
  }
  let search_link;

  if (productSearch && productSearch != "null") {
    search_link = "/search" + search_url + "?s=" + productSearch;
  } else {
    search_link = "/search" + search_url;
  }

  const search_products = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        const values = e.target.value;
        window.location.href = "/search" + search_url + "?s=" + values;
      } else {
        window.location.href = "/search" + search_url;
      }
    }
  };

  const parent_category_exist = (full_url) => {
    const params = {
      token: themeConfig.APILinks.token,
      category: full_url,
    };
    axios
      .post(themeConfig.APILinks.category_exist, params)
      .then((response) => {
        if (response.data.result === true) {
          set_parent_category_title(response.data.category.name);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sub_category_exist = (full_url) => {
    const params = {
      token: themeConfig.APILinks.token,
      category: full_url,
    };
    axios
      .post(themeConfig.APILinks.category_exist, params)
      .then((response) => {
        if (response.data.result === true) {
          set_sub_category_title(response.data.category.name);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const category_menu_display = (url) => {
    if (url === "" || url === "home") {
      return <Categorymenu type={"null"} />;
    }
  };

  const breadcrumb_menu = (full_url) => {
    if (full_url && parseInt(full_url.length) === 3) {
      return (
        <nav aria-label="breadcrumb" className="real-bread hidden">
          <ul className="breadcrumb text-sm text-normal text-green-800 flex flex-wrap items-center justify-center sm:justify-start">
            <li className="breadcrumb-item mr-2 flex">
              <Link href="/" className="hover:text-yellow-900">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item mr-2 flex active text-gray-100">
              {parent_category_title}
            </li>
          </ul>
        </nav>
      );
    } else if (full_url && parseInt(full_url.length) === 4) {
      return (
        <nav aria-label="breadcrumb" className="real-bread hidden">
          <ul className="breadcrumb text-sm text-normal text-green-800 flex flex-wrap items-center justify-center sm:justify-start">
            <li className="breadcrumb-item mr-2 flex">
              <Link href="/" className="hover:text-yellow-900">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item mr-2  flex">
              <Link
                href={"/category/" + full_url[2]}
                className="hover:text-yellow-900"
              >
                {parent_category_title}
              </Link>
            </li>
            <li className="breadcrumb-item active text-gray-100 flex">
              <a className=""> {sub_category_title}</a>
            </li>
          </ul>
        </nav>
      );
    }
  };

  const hero_section_title = (full_url) => {
    if (full_url && parseInt(full_url.length) === 2) {
      return (
        <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
          Turn Up the Creativity with a vast collection of website templates,
          plugins, and much more.
        </h1>
      );
    } else if (full_url && parseInt(full_url.length) === 3) {
      const parent_cat = full_url[2];
      if (parent_cat) {
        if (parent_cat === "html-templates") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.html_category.title}
            </h1>
          );
        } else if (parent_cat === "ui-templates") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.ui_category.title}
            </h1>
          );
        } else if (parent_cat === "plugins") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.plugins.title}
            </h1>
          );
        } else if (parent_cat === "photos") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.photos.title}
            </h1>
          );
        }
      }
    } else if (full_url && parseInt(full_url.length) === 4) {
      const sub_cat = full_url[3];
      if (sub_cat) {
        if (sub_cat === "bootstrap") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {
                contentConfig.hero_section.html_category.sub_category.bootstrap
                  .title
              }
            </h1>
          );
        } else if (sub_cat === "css3") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.html_category.sub_category.css3.title}
            </h1>
          );
        } else if (sub_cat === "tailwindcss") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {
                contentConfig.hero_section.html_category.sub_category.tailwind
                  .title
              }
            </h1>
          );
        } else if (sub_cat === "xd-template") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.ui_category.sub_category.xd.title}
            </h1>
          );
        } else if (sub_cat === "figma") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.ui_category.sub_category.figma.title}
            </h1>
          );
        } else if (sub_cat === "illustrator") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {
                contentConfig.hero_section.ui_category.sub_category.illustrator
                  .title
              }
            </h1>
          );
        } else if (sub_cat === "photoshop") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {
                contentConfig.hero_section.ui_category.sub_category.photoshop
                  .title
              }
            </h1>
          );
        } else if (sub_cat === "wordpress") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {contentConfig.hero_section.plugins.sub_category.wordpress.title}
            </h1>
          );
        } else if (sub_cat === "woocommerce") {
          return (
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-3 leading-tight mt-5">
              {
                contentConfig.hero_section.plugins.sub_category.woocommerce
                  .title
              }
            </h1>
          );
        }
      }
    }
  };

  const hero_section_desc = (full_url) => {
    if (full_url && parseInt(full_url.length) === 2) {
      return (
        <p className="mb-5 md:mb-9 text-lg">
          Outshine your competition and boost your online presence with
          customizable website templates, powerful plugins, and stunning photos.
          Unlock captivating visuals and greater versatility packed in this
          collection.
        </p>
      );
    } else if (full_url && parseInt(full_url.length) === 3) {
      const parent_cat = full_url[2];
      if (parent_cat) {
        if (parent_cat === "html-templates") {
          return (
            <p className="text-md sm:text-lg">
              {contentConfig.hero_section.html_category.description}
            </p>
          );
        } else if (parent_cat === "ui-templates") {
          return (
            <p className="text-md sm:text-lg">
              {contentConfig.hero_section.ui_category.description}
            </p>
          );
        } else if (parent_cat === "plugins") {
          return (
            <p className="text-md sm:text-lg">
              {contentConfig.hero_section.plugins.description}
            </p>
          );
        } else if (parent_cat === "photos") {
          return (
            <p className="text-md sm:text-lg">
              {contentConfig.hero_section.photos.description}
            </p>
          );
        }
      }
    } else if (full_url && parseInt(full_url.length) === 4) {
      const sub_cat = full_url[3];
      if (sub_cat) {
        if (sub_cat === "bootstrap") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.html_category.sub_category.bootstrap
                  .description
              }
            </p>
          );
        } else if (sub_cat === "css3") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.html_category.sub_category.css3
                  .description
              }
            </p>
          );
        } else if (sub_cat === "tailwindcss") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.html_category.sub_category.tailwind
                  .description
              }
            </p>
          );
        } else if (sub_cat === "xd-template") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.ui_category.sub_category.xd
                  .description
              }
            </p>
          );
        } else if (sub_cat === "figma") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.ui_category.sub_category.figma
                  .description
              }
            </p>
          );
        } else if (sub_cat === "illustrator") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.ui_category.sub_category.illustrator
                  .description
              }
            </p>
          );
        } else if (sub_cat === "photoshop") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.ui_category.sub_category.photoshop
                  .description
              }
            </p>
          );
        } else if (sub_cat === "wordpress") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.plugins.sub_category.wordpress
                  .description
              }
            </p>
          );
        } else if (sub_cat === "woocommerce") {
          return (
            <p className="text-md sm:text-lg">
              {
                contentConfig.hero_section.plugins.sub_category.woocommerce
                  .description
              }
            </p>
          );
        }
      }
    }
  };

  const template_image_html = (full_url) => {
    if (full_url && parseInt(full_url.length) === 2) {
      return (
        <div className="w-full order-1 lg:order-2 mb-7 lg:mb-0 lg:w-2/4 px-4 hidden sm:block">
          <div className="flex flex-wrap justify-center lg:justify-end max-w-[490px] mx-auto mt-5 lg:mt-0 lg:mr-0">
            <div className="box1 group overflow-hidden max-w-[235px] xl:max-w-[280px] z-[2] mr-[75px] h-full rounded-xl w-full before:block bg-green-100 before:pt-[65%] relative transition-all">
              <div
                name="product_show"
                className="block absolute top-0 left-0 w-full h-full"
              >
                <img
                  src="/assets/img/shoes_web.jpg"
                  alt="1773134734.jpg"
                  title="shoes_web.jpg"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 "
                />
              </div>
            </div>
            <div className="box2 group -mt-[50px] mr-[120px] z-[0] h-full overflow-hidden max-w-[235px] xl:max-w-[280px] rounded-xl w-full before:block bg-green-100 before:pt-[65%] relative transition-all">
              <div
                name="product_show"
                className="block absolute top-0 left-0 w-full h-full"
              >
                <img
                  src="/assets/img/wedding_web.jpg"
                  alt="1773134734.jpg"
                  title="wedding_web.jpg"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 "
                />
              </div>
            </div>
            <div className="box1 group -mt-[100px] -ml-[90px] z-[3] h-full overflow-hidden max-w-[180px] rounded-xl w-full before:block bg-green-100 before:pt-[129%] relative transition-all">
              <div
                name="product_show"
                className="block absolute top-0 left-0 w-full h-full"
              >
                <img
                  src="/assets/img/email_full.jpg"
                  alt="1773134734.jpg"
                  title="email_full.jpg"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 "
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const section_class = (full_url) => {
    let add_class = "";
    if (full_url && parseInt(full_url.length) === 2) {
      add_class = "lg:w-2/4";
    }
    return add_class;
  };

  const customize_hero_section = (full_url) => {
    if (full_url && parseInt(full_url.length) === 2) {
      return (
        <div className="flex flex-wrap items-center -mx-4  px-2 sm:px-4">
          <div
            className={
              "w-full order-2 lg:order-1  px-4 " + section_class(full_url)
            }
          >
            {breadcrumb_menu(full_url)}
            {pathname.includes("category") ? (
              <ul className="dummy-bread breadcrumb text-sm text-light text-green-800 truncate items-center justify-start">
                <Skeleton width="50%" height={20} />
              </ul>
            ) : (
              ""
            )}
            <div>
              {hero_section_title(full_url)}
              {hero_section_desc(full_url)}
            </div>
            <div className="md:mb-5">
              <form>
                <div className="bg-green-400  rounded-xl p-1 sm:p-1 flex  ">
                  <input
                    value={productSearch}
                    placeholder="Search for mockups, Web Templates and More....."
                    onClick={search_products}
                    onChange={(e) => {
                      setproductSearch(e.target.value);
                    }}
                    className="py-2 px-5 md:px-8 focus:outline-none text-md placeholder:text-[#989898] text-black w-full bg-transparent border-none rounded-none"
                  />
                  <Link
                    href={search_link}
                    type="button"
                    className="button-hover-green search-product transition-all duration-500 text-green-900 bg-yellow-900 h-[40px] md:h-[45px] text-1xl border-none hover:text-white   hover:bg-green-900  rounded-lg flex items-center justify-center shrink-0 px-5 sm:w-[85px]"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {template_image_html(full_url)}
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap items-center">
          <div
            className={
              "w-full order-2 lg:order-1  flex flex-wrap" +
              section_class(full_url)
            }
          >
            <div className="w-full lg:w-2/4 lg:pr-4 pr-0">
              {breadcrumb_menu(full_url)}
              <ul className="dummy-bread breadcrumb text-sm text-light text-green-800 truncate items-center justify-start">
                <Skeleton width="50%" height={20} />
              </ul>
              {hero_section_title(full_url)}
            </div>
            <div className="md:mb-5 w-full lg:w-2/4 justify-self-start  self-center lg:pl-4 pl-0 lg:pb-0 pb-4">
              <form>
                <div className="bg-green-400  rounded-xl p-1 sm:p-1 flex  ">
                  <input
                    value={productSearch}
                    placeholder="Search for mockups, Web Templates and More....."
                    onClick={search_products}
                    onChange={(e) => {
                      setproductSearch(e.target.value);
                    }}
                    className="py-2 px-5 md:px-8 focus:outline-none text-md placeholder:text-[#989898] text-black w-full bg-transparent border-none rounded-none"
                  />
                  <Link
                    href={search_link}
                    type="button"
                    className="button-hover-green search-product transition-all duration-500 text-green-900 bg-yellow-900 h-[40px] md:h-[45px] text-1xl border-none hover:text-white   hover:bg-green-900  rounded-lg flex items-center justify-center shrink-0 px-5 sm:w-[85px]"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </div>
              </form>
            </div>
            {hero_section_desc(full_url)}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (
      current_url &&
      (parseInt(current_url.length) === 3 || parseInt(current_url.length) === 4)
    ) {
      parent_category_exist(current_url[2]);
    }
    if (current_url && parseInt(current_url.length) === 4) {
      sub_category_exist(current_url[3]);
    }
  }, []);

  return (
    <div className="px-0 1xl:px-10">
      <section
        className={
          "bg-green-100 pt-8 pb-12 sm:py-12 text-center sm:text-left rounded-b-4xl sm:rounded-b-5xl "
        }
      >
        <div className="container mx-auto px-4 sm:px-8 ">
          {/* {customize_hero_section(current_url)} */}
        </div>
        {category_menu_display(current_url[1])}
      </section>
    </div>
  );
};
export default Hero;
