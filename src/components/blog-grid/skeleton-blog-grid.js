import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DummyblogGrid = () => {
  return(
    <div className="rounded-4xl relative bg-white shadow-box group p-4">
        <div className="py-3 p-2 sm:px-4 mb-5">
          <p className="text-lg mb-2 text-green-900 font-bold hover:text-yellow-900 leading-5">
           <Skeleton height={40} />
          </p>
          <Skeleton height={45} />
        </div>
        <div className="relative">
          <span className="hidden -rotate-45 -rotate-45 bg-yellow-900 z-1 rounded-full w-[51px] h-[51px] flex items-center justify-center text-green-900 text-xl absolute -top-6 right-0 border-4 border-white hover:bg-green-800 hover:text-white">
            <Skeleton width={40} height={40} />
          </span>
          <div className="blog-grid-skeleton overflow-hidden before:block bg-green-100 before:pt-[60%] relative rounded-lg">
            <span className="block absolute top-0 left-0 w-full h-full">
              <Skeleton width={304} height={219} />
            </span>
          </div>
        </div>
      </div>
    )
}
export default DummyblogGrid
