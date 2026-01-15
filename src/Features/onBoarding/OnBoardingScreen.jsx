import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { onboardingSwiperData } from '../data/onboardingData';
import OnboardingSlide from '../../components/OnboardingSlide/OnboardingSlide';
import DotNavigation from '../../components/DotNavigation/DotNavigation';
import BlueButton from '../../components/button/onBoardingButton';
import { onboardingSwiperData } from '../../utlis/onboardingData';
 
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < onboardingSwiperData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/login');
    }
  };


  return (
    <div className="w-full">
      <OnboardingSlide {...onboardingSwiperData[currentIndex]} />

      <div className="flex justify-between items-center p-4 fixed bottom-0 w-full bg-white ">
        <DotNavigation data={onboardingSwiperData} currentIndex={currentIndex} />
        {/* <BlueButton text="Get Started" onClick={handleNext} /> */}
      </div>
    </div>
  );
};

export default OnboardingScreen;
