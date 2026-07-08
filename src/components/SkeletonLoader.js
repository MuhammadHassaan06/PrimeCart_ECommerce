import React from "react";

export default function SkeletonLoader() {
  // Render a grid of 8 product skeletons
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="group relative flex flex-col rounded-lg border border-gray-100 p-4">
          {/* Image skeleton */}
          <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse mb-4 h-48 sm:h-52"></div>
          {/* Category skeleton */}
          <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse mb-2"></div>
          {/* Title skeleton */}
          <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse mb-3"></div>
          {/* Price & Rating skeleton */}
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
            <div className="h-5 w-1/4 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse"></div>
          </div>
          {/* Button skeleton */}
          <div className="h-10 w-full rounded bg-gray-200 animate-pulse mt-4"></div>
        </div>
      ))}
    </div>
  );
}
