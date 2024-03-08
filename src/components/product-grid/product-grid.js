import React, { useState, useEffect } from "react";
import { useCart, CartProvider } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";

//Import Utils:
import "react-toastify/dist/ReactToastify.css";
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

const Productgrid = ({ prod }) => {

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
        <div className="overflow-hidden before:block bg-green-900 before:pt-[65%] relative">
          <Link
            name="product_show"
            href={`/blog/${prod.character}`}
            className="block absolute top-0 left-0 w-full h-full group-hover:opacity-75 transition-all duration-500"
          >
            {set_thumbnail_image(prod.grid_view_url, prod.image)}
          </Link>
        </div>
        <div className="px-5 py-4">
          <h3 className="text-green-900 font-bold text-md sm:min-h-[50px] product-grid-title">
            <Link
              name="product_show"
              href={`/blog/${prod.character}`}
              className="hover:text-yellow-900"
            >
              {prod.name}
            </Link>
          </h3>
          <div className="flex items-center justify-between mt-2 min-h-[24px]">
            <div>
              <div className="text-yellow-900 text-[10px] flex items-center">
                type:-{prod.type}
              </div>
            </div>
            <div>{prod.gameSeries}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Productgrid;
