const ShimmerUserCard = () => {
  return (
    <div className="w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[400px] h-[450px] sm:h-[480px] md:h-[500px] rounded-2xl bg-gray-200 animate-pulse p-6 flex flex-col items-center shadow-md">
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gray-300 mb-4" />
      <div className="h-4 w-3/4 sm:w-1/2 bg-gray-300 rounded mb-2" />
      <div className="h-3 w-1/2 sm:w-1/3 bg-gray-300 rounded mb-4" />
      <div className="w-full h-20 sm:h-24 bg-gray-300 rounded" />
    </div>
  );
};

export default ShimmerUserCard;
