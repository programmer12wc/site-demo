import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useCart } from "react-use-cart";

//Import Utils:
import axios from "axios";
import Link from "next/link.js";

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

const AddtoCart = () => {
  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const close_cart = () => {
    $(".add-cart-popup").addClass("hidden");
  };

  return (
    <div className="add-cart-popup hidden">
      <div className="cart-inner">
        <div className="popup-wrap">
          <div className="title-wrap">
            <p className="title">
              <i className="fa-regular fa-circle-check"></i> Added to cart
            </p>
            <i
              className="fa-solid fa-xmark cursor-pointer -mt-3 hover:text-gray-100 p-2"
              onClick={() => close_cart()}
            ></i>
          </div>
          <div className="pro-scroll">
            {items.map((item, index) => {
              return (
                <div className="added-item" key={index}>
                  <div className="pro-wrap">
                    <div className="pro-image">
                      <Link
                        name="product_show"
                        href={`/product/${item.slug}`}
                        className="block absolute top-0 left-0 w-full h-full group-hover:opacity-75 transition-all duration-500"
                      >
                        <img
                          src={item.product_image_url}
                          alt={get_url_extension(item.product_image_url)}
                          title={get_url_extension(item.product_image_url)}
                          className="w-full h-full"
                        />
                      </Link>
                    </div>
                    <p className="text-green-900 font-bold text-md text-center sm:text-left sm:py-0 py-2 px-2 grow sm:max-w-[350px] product-grid-title">
                      <Link
                        name="product_show"
                        href={`/product/${item.slug}`}
                        className="hover:text-yellow-900"
                      >
                        {item.product_name}
                      </Link>
                    </p>

                    <span className="price">${Number_format(item.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="popup-footer">
            <a
              name="checkout"
              className="all-btn"
              href="/checkout"
              onClick={() => close_cart()}
            >
              Checkout now{" "}
              <i className="fa-solid fa-angles-right text-sm ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddtoCart;
