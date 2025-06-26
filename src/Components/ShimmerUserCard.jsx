const ShimmerUserCard = () => {
  return (
    <div className="w-[90vw] max-w-md h-[500px] rounded-2xl bg-gray-200 animate-pulse p-6 flex flex-col items-center shadow-md">
      <div className="w-32 h-32 rounded-full bg-gray-300 mb-4" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
      <div className="h-3 w-1/3 bg-gray-300 rounded mb-4" />
      <div className="w-full h-20 bg-gray-300 rounded" />
    </div>
  );
};

export default ShimmerUserCard;
