import React from 'react';

const OnboardingSlide = ({ image, title, note }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen  bg-gradient-to-b from-blue-100 to-white p-3">
      <div className="max-w-6xl w-full md:flex bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ">
        {/* Image Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-white flex items-center justify-center md:pt-10">
          <img src={image} alt="slide" className="max-h-[500px] w-auto object-contain animate-fade-in" />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 flex  flex-col justify-center p-4 md:p-10 ">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 text-gray-800 md:leading-tight">{title}</h2>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-blue-600 leading-tight">Games</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">{note}</p>
          <div className="h-1 w-20 bg-blue-500 rounded mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;
