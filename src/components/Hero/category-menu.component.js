import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Link from "next/link";

const Categorymenu = ({ type }) => {
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category Menu of Hero Section //

  const Hero_Category_Menu = () => {
    const params = {
      token: "A5HFstrolor3upoitxdsqzwod8t7U",
      parent: type,
    };
    axios
      .post("https://api.webbytemplate.com/v1/category", params)
      .then((response) => {
        setCategoryMenu(response.data.category.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    Hero_Category_Menu();
  }, []);

  return (
    <section>
      <div className="container mx-auto max-w-[950px]">
        <div className="pt-6 lg:pt-10 -mb-24">
          <ul className="gap-3 sm:gap-6 lg:gap-12 flex-wrap flex py-3 lg:py-0 items-center justify-center">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="inline-block align-middle sm:mx-2 lg:mx-0"
                  >
                    <Link
                      href="#"
                      name="category_menu"
                      className="group transition-all duration-500 lg:hover:-translate-y-2 relative mx-auto md:mx-0 block text-green-800 hover:text-yellow-900 hover:shadow-boxhover text-4xl rounded-xl bg-white shadow-box w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] flex items-center justify-center"
                    >
                      <Skeleton width={52} height="100%" />
                    </Link>
                  </li>
                ))
              : categoryMenu.map((item) => (
                  <li
                    className="inline-block align-middle sm:mx-2 lg:mx-0"
                    key={item.id}
                  >
                    <Link
                      name="category_menu"
                      href={"/category/" + item.slug}
                      className="group transition-all duration-300  relative mx-auto md:mx-0 block text-green-800 lg:hover:-mt-5 hover:text-yellow-900  hover:shadow-boxhover  text-4xl rounded-xl bg-white shadow-box w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] flex items-center justify-center"
                    >
                      <img
                        src={item.image_url}
                        alt={item.image_name}
                        title={item.image_name}
                        width="52"
                        className=" max-w-[40px] md:max-w-none  transition-all duration-300 "
                      />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Categorymenu;
