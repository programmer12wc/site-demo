import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

//Import Components:
import AddtoCart from "@/components/add-to-cart/add-to-cart";

//Import Utils:
import { useRouter } from "next/router.js";
import Link from "next/link";

const get_url_extension = (url) => {
  if (url) {
    return url.substring(url.lastIndexOf("/") + 1);
  } else {
    return "";
  }
};

const Header = () => {
  const location = useRouter();
  //console.log(location)
  const { pathname } = location;
  const current_url = pathname.split("/");

  return (
    <div className="px-0 1xl:px-10 h-[60.28px] lg:h-[84px] relative z-10 lg:bg-white bg-green-100 main-header">
      <header className="sticky-header bg-green-100 border-b border-green-500 py-3 lg:py-4 px-4 lg:px-8 xl:px-10 transition-all fixed top-0 left-0 lg:left-auto w-full 1xl:left-2.5rem 1xl:w-[calc(100%-5rem)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-auto logo">
            {/* <div className="mr-2 lg:hidden">
              <button
                name="mobile-menu-view"
                onClick={() => toggleClass()}
                className="w-[35px] block p-2"
              >
                <span className="w-full bg-green-900 h-[2px] mb-1 block "></span>
                <span className="w-full bg-green-900 h-[2px] mb-1 block "></span>
                <span className="w-full bg-green-900 h-[2px] mb-0 block"></span>
              </button>
            </div> */}
            <Link name="white_logo" href="/" className="">
              <img
                src={"/assets/logo/logo-light.svg"}
                alt={get_url_extension("/assets/logo/logo-light.svg")}
                title={get_url_extension("/assets/logo/logo-light.svg")}
                className="mx-auto sm:m-0"
                width="318"
              />
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <div
              id="mainmenu"
              className="main-menu block z-20 fixed top-0 mr-3 -left-[120%] transition-all  h-full w-full bg-green-900 bg-opacity-0 lg:bg-transparent lg:h-auto lg:w-auto lg:static"
            >
              <div
                className=" absolute top-0 left-0 w-full h-full z-10 overlay"
                // onClick={() => toggleClass()}
              ></div>
              <div className="mx-auto ml-0 h-full lg:m-0 max-w-full  lg:max-w-none sm:max-w-[350px]  lg:pt-0 bg-white lg:bg-transparent z-20 relative overflow-auto lg:pb-0 pb-4">
                <ul className="overflow-y-scroll overflow-auto lg:overflow-y-auto  lg:py-2 sm:px-0 px-4 lg:h-auto items-center font-proxima-nova font-semibold text-md text-gray-700 leading-none justify-end block lg:flex">
                  <li className="relative p-0 lg:mx-2 xl:mx-3 2xl:mx-4  lg:border-b-0 border-b border-green-300">
                    <Link
                      href="/blog"
                      name="blog"
                      className={
                        current_url[1] === "blog"
                          ? "transition-all duration-400 block py-5 sm:py-4 lg:py-1 px-5 lg:px-0 text-green-900 active sm:text-left text-center   lg:bg-transparent bg-gray-300"
                          : "transition-all duration-400 block py-5 sm:py-4 lg:py-1 px-5 lg:px-0 lg:text-gray-100 text-gray-700 hover:text-green-900  sm:text-left text-center"
                      }
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
                <div className="my-6 px-5 lg:hidden block"></div>
                <div className=" sm:text-left text-center lg:hidden block px-5">
                  <p className=" text-base  text-black mb-3">
                    Connect with us:
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center lg:border-l border-green-500 pl-3 xl:pl-3"></div>
          </div>
        </div>

        <div className="search-bar absolute -top-[180%] transition-all left-0 w-full  bg-white z-20 rounded-bl-3xl rounded-br-3xl sm:pt-0 pt-2 sm:pb-0 pb-2 ">
          <div
            className=" absolute top-0 left-0 w-full h-full z-10 search-body-close"
            onClick={() => close_search_bar()}
          ></div>
          <form>
            <div className=" relative  inline-block w-full">
              <div className="p-2 px-4 sm:p-4 flex ">
                <span
                  name="search search-bar"
                  onClick={() => {
                    search_by_button_products(productSearch);
                  }}
                  type="button"
                  className="cursor-pointer transition-all duration-500 text-green-900 bg-yellow-900 h-[36px] w-[36px] sm:h-[47px] sm:text-lg  sm:text-1xl border-none hover:bg-green-900 hover:text-white rounded-lg flex items-center justify-center shrink-0 sm:px-5 px-2 sm:w-[85px]"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <a
                  onClick={() => close_search_bar()}
                  className="sm:ml-2 search-close px-3 flex items-center justify-center font-bold text-black text-xl hover:text-gray-100 cursor-pointer "
                >
                  <i className="fa-solid fa-xmark"></i>
                </a>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};
export default Header;
