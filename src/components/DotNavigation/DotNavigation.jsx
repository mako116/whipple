 
const DotNavigation = ({ data, currentIndex }) => {
  return (
    <div className="flex items-center gap-2">
      {data.map((_, index) => (
        <div
          key={index}
          className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-blue-600 w-16' : 'bg-blue-300 w-2.5'}`}
        ></div>
      ))}
    </div>
  );
};

export default DotNavigation;
