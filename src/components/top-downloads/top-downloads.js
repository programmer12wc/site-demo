import React, { useState, useEffect } from "react";

//Import Components:
import ProductGrid from "@/components/product-grid/product-grid";
import Dummygrid from "@/components/skeleton-product-grid/skeleton-product-grid";

//Import Utils:
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Topdownloads = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const products_list = () => {
    // let params = {
    //   token: "A5HFstrolor3upoitxdsqzwod8t7U",
    //   type: "best_download",
    // };
    axios
      .get("https://www.amiiboapi.com/api/amiibo")
      .then((response) => {
        if (response.data) {
          setproducts(response.data.amiibo);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    products_list();
  }, []);

  return (
    <div>
      <section className="pt-20 md:pt-32 lg:pt-44 pb-12 md:pb-20 text-center rounded-b-5xl">
        <div className="container mx-auto">
          <div className="mx-auto max-w-[880px]">
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl text-green-900 font-bold mb-4  leading-tight">
              Top Downloads
            </h2>
            <p className="mb-4 text-md">
              Discover the most in-demand top-downloaded items trusted by top
              businesses.
            </p>
          </div>
          <div className="overflow-hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              watchSlidesProgress={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper top-downloads-slider"
              navigation={true}
              modules={[Navigation]}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SwiperSlide className="p-3" key={index}>
                      <Dummygrid />
                    </SwiperSlide>
                  ))
                : products.map((pro, index) => (
                    <SwiperSlide className="p-3" key={index}>
                      <ProductGrid prod={pro} />
                    </SwiperSlide>
                  ))}
            </Swiper>
            {/* <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper top-downloads-slider dummy-products"
              navigation={true}
              modules={[Navigation]}
            >
              <SwiperSlide className="p-3">
                <Dummygrid />
              </SwiperSlide>
              <SwiperSlide className="p-3">
                <Dummygrid />
              </SwiperSlide>
              <SwiperSlide className="p-3">
                <Dummygrid />
              </SwiperSlide>
              <SwiperSlide className="p-3">
                <Dummygrid />
              </SwiperSlide>
            </Swiper> */}
          </div>
          <div className="text-center mt-5 lg:mt-12">
            <Link
              name="discover_all"
              href="/search?sort=best_download"
              className="all-btn"
            >
              Discover all{" "}
              <i className="fa-solid fa-angles-right text-sm sm:text-base ml-2 sm:ml-4"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Topdownloads;
