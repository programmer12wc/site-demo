import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//Import Utils:

const get_url_extension = (url) => {
  if (url) {
    return url.substring(url.lastIndexOf("/") + 1);
  } else {
    return "";
  }
};
import { useRouter } from "next/router.js";
import Link from "next/link.js";

const Footer = () => {
  const location = useRouter();
  const { pathname } = location;
  const current_url = pathname.split("/");

  let reference_class = "";

  if (current_url.legnth > 1) {
    if (current_url.legnth > 2) {
      reference_class = "." + current_url[3];
    } else {
      reference_class = "." + current_url[1];
    }
  }

  const active_this = (url) => {
    let active = "";
    if (url == pathname) {
      active = "active";
    }
    return active;
  };

  return (
    <div className={"footer " + reference_class}>
      <footer>
        <div className="bg-gray-900 pt-8 sm:pt-12">
          <div className="container mx-auto">
            <div className="sm:flex items-center justify-between pb-5 sm:pb-8">
              <div className="mb-5 sm:mb-0">
                <Link name="white_logo" href="/" className="">
                  <img
                    src={"/assets/logo/webbytemplate-logo-white.svg"}
                    alt={get_url_extension(
                      "/assets/logo/webbytemplate-logo-white.svg"
                    )}
                    title={get_url_extension(
                      "/assets/logo/webbytemplate-logo-white.svg"
                    )}
                    className="mx-auto sm:m-0"
                    width="318"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:flex  items-center justify-between py-3 sm:py-5">
              <div className="text-white text-center lg:text-left md:text-md text-[15px]">
                <p className="font-normal">
                  © 2023{" "}
                  <Link
                    name="link"
                    href="/"
                    className="hover:text-yellow-900 underline"
                  >
                    WebbyTemplate.com
                  </Link>{" "}
                  owned by WebbyCrown Solutions. All rights reserved.
                </p>
              </div>
              <div className="text-white text-center lg:text-right md:text-md text-[15px]">
                <p className="font-normal">
                  <Link
                    name="terms_conditions"
                    href="/terms-conditions"
                    className={
                      "hover:text-yellow-900 " +
                      active_this("/terms-conditions")
                    }
                  >
                    Terms & Conditions
                  </Link>{" "}
                  |{" "}
                  <Link
                    name="privacy_policy"
                    href="/privacy-policy"
                    className="hover:text-yellow-900"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
