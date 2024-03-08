import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BlogsGrid = ({ blog }) => {
  const location = useRouter();
  const { pathname } = location;
  const current_url = pathname.split("/");

  const blog_description = (description) => {
    if (current_url[1] === "blog") {
      return (
        <p
          className="text-[15px] text-light"
          dangerouslySetInnerHTML={{
            __html: description.substring(0, 125) + "...",
          }}
        ></p>
      );
    } else {
      return (
        <p
          className="text-[15px] text-light"
          dangerouslySetInnerHTML={{
            __html: description.substring(0, 80) + "...",
          }}
        ></p>
      );
    }
  };
  return (
    <div className="rounded-4xl relative bg-white shadow-box group p-2 xl:p-4 grid content-between w-blog">
      <div className="py-3 p-2 1xl:px-4 mb-3">
        <h3 className="text-lg mb-2 text-green-900 font-bold hover:text-yellow-900 leading-5">
          <Link name="blog_view" href={`/blog/${blog.id}`} className="">
            {blog.name}
          </Link>
        </h3>
        {blog_description(blog.seo_description)}
      </div>
      <div className="relative">
        <Link
          name="blog_view"
          href={`/blog/${blog.id}`}
          className="-rotate-45 -rotate-45 bg-yellow-900 z-1 rounded-full w-[51px] h-[51px] flex items-center justify-center text-green-900 text-xl absolute -top-6 right-0 border-4 border-white hover:bg-green-800 hover:text-white"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
        <div className="overflow-hidden before:block bg-green-100 before:pt-[60%] relative rounded-lg">
          <Link
            name="blog_view"
            href={`/blog/${blog.id}`}
            className="block absolute top-0 left-0 w-full h-full"
          >
            <img
              src={blog.image_url}
              alt={blog.image_name}
              title={blog.image_name}
              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogsGrid;
