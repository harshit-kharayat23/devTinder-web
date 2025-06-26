import React from "react";

const ShimmerConnectionCard = () => {
  return (
    <div className="w-[90vw] max-w-3xl h-[180px] sm:h-[150px] flex flex-row items-start gap-5 p-6 rounded-2xl shadow-md bg-gray-200 animate-pulse">
      {/* Shimmer Avatar */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 rounded-full" />

      {/* Shimmer Text */}
      <div className="flex-1 space-y-3">
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-3 w-1/5 bg-gray-300 rounded" />
        <div className="h-3 w-1/4 bg-gray-300 rounded" />
        <div className="h-12 w-full bg-gray-300 rounded" />
        <div className="flex gap-3 mt-2">
          <div className="h-8 w-20 bg-gray-300 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerConnectionCard;
