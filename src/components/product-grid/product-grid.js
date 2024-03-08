import React, { useState, useEffect } from "react";
import { useCart, CartProvider } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";

//Import Utils:
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";

const Number_format = (value) => {
  const new_value = parseFloat(value).toFixed(2);
  return new_value;
};

const get_url_extension = (url) => {
  if (url) {
    return url.substring(url.lastIndexOf("/") + 1);
  } else {
    return "";
  }
};

const reviewStar = (review) => {
  let star = [];
  let solidStar = parseInt(review);

  for (var i = 0; i < solidStar; i++) {
    star.push(<i className="fa-solid fa-star" key={i + Math.random()}></i>);
  }
  if (review > solidStar) {
    star.push(
      <i
        className="fa-solid fa-star-half-stroke"
        key={review + Math.random()}
      ></i>
    );

    let blankStar = solidStar + 1;
    for (var j = 0; j < 5 - blankStar; j++) {
      star.push(<i className="fa-regular fa-star" key={j + Math.random()}></i>);
    }
  } else {
    for (var k = 0; k < 5 - solidStar; k++) {
      star.push(<i className="fa-regular fa-star" key={k + Math.random()}></i>);
    }
  }
  return star;
};

const Productgrid = ({ prod }) => {
  //Set price according type of product:
  const set_price_label = (sales_price = 0, regular_price = 0) => {
    if (sales_price === 0) {
      return (
        <span className="border border-green-200 text-[13px] font-semibold text-green-900 uppercase rounded-[3px] bg-green-300 py-0.5 px-1.5">
          Free
        </span>
      );
    } else {
      return (
        <span>
          <span className="text-md text-yellow-900  font-semibold line-through pr-1">
            ${Number_format(regular_price)}
          </span>
          <span className="text-md font-bold text-green-800">
            ${Number_format(sales_price)}
          </span>
        </span>
      );
    }
  };
  // set cart button
  // const add_cart_btn = (item) => {
  //   const found = items.some((el) => el.id === item.id);

  //   if (item.external_by_link == "" || item.external_by_link == null) {
  //     if (found === false) {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <i className="fa-solid fa-cart-shopping"></i>
  //         </button>
  //       );
  //     } else {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-white text-lg  px-2 py-1 rounded bg-green-800 cursor-pointer"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <i className="fa-solid fa-cart-arrow-down  "></i>
  //         </button>
  //       );
  //     }
  //   } else {
  //     const external_link_type = item.external_link_type;
  //     if (parseInt(external_link_type) === 1) {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer flex items-center"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <img
  //             src={"/assets/img/envato_g.svg"}
  //             alt={get_url_extension("/assets/img/envato_g.svg")}
  //             title={get_url_extension("/assets/img/envato_g.svg")}
  //             className=" inline-block w-[24px] h-[24px] object-contain"
  //           />
  //         </button>
  //       );
  //     } else if (parseInt(external_link_type) === 2) {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer flex items-center"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <img
  //             src={"/assets/img/template-monster_g.svg"}
  //             alt={get_url_extension("/assets/img/template-monster_g.svg")}
  //             title={get_url_extension("/assets/img/template-monster_g.svg")}
  //             className=" inline-block w-[24px] h-[24px] object-contain"
  //           />{" "}
  //           <span className="inline-block"></span>
  //         </button>
  //       );
  //     } else if (parseInt(external_link_type) === 3) {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer flex items-center"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <img
  //             src={"/assets/img/creative_market_g.svg"}
  //             alt={get_url_extension("/assets/img/creative_market_g.svg")}
  //             title={get_url_extension("/assets/img/creative_market_g.svg")}
  //             className=" inline-block w-[24px] h-[24px] object-contain "
  //           />
  //         </button>
  //       );
  //     } else if (parseInt(external_link_type) === 4) {
  //       return (
  //         <button
  //           name="add_to_cart"
  //           className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer flex items-center"
  //           // onClick={() => add_cart_item(prod)}
  //         >
  //           <img
  //             src={"/assets/img/Wordpress_g.svg"}
  //             alt={get_url_extension("/assets/img/Wordpress_g.svg")}
  //             title={get_url_extension("/assets/img/Wordpress_g.svg")}
  //             className=" inline-block w-[24px] h-[24px] object-contain "
  //           />
  //         </button>
  //       );
  //     }
  //   }
  // };
  // Set thumbnail image

  const set_thumbnail_image = (thumb_image_url, product_image_url) => {
    if (thumb_image_url) {
      return (
        <img
          src={thumb_image_url}
          alt={get_url_extension(thumb_image_url)}
          title={get_url_extension(thumb_image_url)}
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 "
        />
      );
    } else {
      return (
        <img
          src={product_image_url}
          alt={get_url_extension(product_image_url)}
          title={get_url_extension(product_image_url)}
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 "
        />
      );
    }
  };

  return (
    <div key={prod.id} className="list-pro-item">
      <div className="overflow-hidden rounded-lg  relative bg-white shadow-box group text-left   transition-all duration-300 hover:shadow-boxhover">
        <div
          className={
            "bg-white/60 w-10 lg:w-12 h-10 lg:h-12 rounded-full absolute top-2.5 right-2.5 p-1 lg:p-1.5 z-1 transition-all duration-500 "
          }
        >
          <button
            name="add_wishlist"
            onClick={() => add_wishlist_item(prod)}
            className={
              "flex items-center justify-center rounded-full w-full h-full bg-white text-lg hover:text-yellow-900 text-green-800 "
            }
          >
            <i className={"fa-heart "}></i>
          </button>
        </div>
        <div className="overflow-hidden before:block bg-green-900 before:pt-[65%] relative">
          <Link
            name="product_show"
            href={`/product/${prod.slug}`}
            className="block absolute top-0 left-0 w-full h-full group-hover:opacity-75 transition-all duration-500"
          >
            {set_thumbnail_image(prod.grid_view_url, prod.product_image_url)}
          </Link>
        </div>
        <div className="px-5 py-4">
          <h3 className="text-green-900 font-bold text-md sm:min-h-[50px] product-grid-title">
            <Link
              name="product_show"
              href={`/product/${prod.slug}`}
              className="hover:text-yellow-900"
            >
              {prod.product_name}
            </Link>
          </h3>
          <div className="flex items-center justify-between mt-2 min-h-[24px]">
            <div>
              <div className="text-yellow-900 text-[10px] flex items-center">
                {reviewStar(prod.star)}
              </div>
            </div>
            <div>{set_price_label(prod.sales_price, prod.regular_price)}</div>
          </div>
          <div className="flex items-end justify-between mt-3 border-t border-green-300 pt-3 items-center">
            <div>
              {prod.is_external === 1 ? (
                <span className="text-sm">
                  {prod.external_sales_count} Sales
                </span>
              ) : (
                <span className="text-sm">{prod.total_sales} Sales</span>
              )}
            </div>
            <div className="flex items-center">
              <div>
                <Link
                  name="product_show"
                  href={`/product/${prod.slug}`}
                  className="text-green-800 text-lg hover:text-yellow-900 py-1"
                >
                  <i className="fa-solid fa-eye"></i>
                </Link>
              </div>
              <div className="pl-2 border-l border-green-300 ml-4">
                {prod.status === "Scheduled" ? (
                  <button
                    name="add_to_cart"
                    className="text-green-800 text-lg hover:text-yellow-900 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    <i className="fa-solid fa-clock"></i>
                  </button>
                ) : (
                  <></>
                  // add_cart_btn(prod)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Productgrid;
