import React from "react";

const ShimmerConnectionCard = () => {
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:max-w-3xl h-auto sm:h-[160px] flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 rounded-2xl shadow-md bg-gray-200 animate-pulse">
      {/* Shimmer Avatar */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-300 rounded-full" />

      {/* Shimmer Text */}
      <div className="flex-1 space-y-3 w-full sm:w-auto">
        <div className="h-4 w-2/3 sm:w-1/3 bg-gray-300 rounded" />
        <div className="h-3 w-1/2 sm:w-1/5 bg-gray-300 rounded" />
        <div className="h-3 w-1/2 sm:w-1/4 bg-gray-300 rounded" />
        <div className="h-12 w-full bg-gray-300 rounded" />
        <div className="flex gap-3 mt-2">
          <div className="h-8 w-28 sm:w-20 bg-gray-300 rounded" />
          <div className="h-8 w-28 sm:w-20 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ShimmerConnectionCard;
