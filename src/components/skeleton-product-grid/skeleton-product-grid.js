import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dummygrid = () => {
  return(
    <div>
      <div className="overflow-hidden rounded-lg relative bg-white shadow-box group grid-box">
        <div className="bg-white/60 w-12 h-12 rounded-full absolute top-2.5 right-2.5 p-1.5 z-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500">
          <span className="flex items-center justify-center rounded-full w-full h-full bg-white text-green-800 text-lg hover:text-yellow-900">
            <Skeleton width="100%" height={48} />
          </span>
        </div>
        <div className="grid-view-skeleton">
          <Skeleton width="100%" height={218.39} />
        </div>
        <div className="px-5 py-4">
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-green-900 font-bold text-md">
               <Skeleton width="100%" height={20} />
              </h4>
              <div className="text-yellow-900 text-[10px] mt-2 flex items-center">
                <Skeleton width={110} height={10} />
              </div>
            </div>
            <div>
              <Skeleton width={70} height={10} />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3 border-t border-green-300 pt-3">
            <div>
              <Skeleton width={46} height={15} />
            </div>
            <div className="flex items-center">
              <div>
                <span className="text-green-800 text-lg hover:text-yellow-900 py-1">
                  <Skeleton width={20} height={20} />
                </span>
              </div>
              <div className="pl-4 border-l border-green-300 ml-4">
                <span className="text-green-800 text-lg hover:text-yellow-900 py-1">
                  <Skeleton width={40} height={36} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Dummygrid

