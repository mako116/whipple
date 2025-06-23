import HeroCarousel from "../../components/Carousel/Carousel";
import PopularNav from "../../components/PopularNav/PopularNav";

// images
import rect from "../../assets/images/Rectangle 10.png";
import rect1 from "../../assets/images/Rectangle 7.png";
import rect2 from "../../assets/images/Rectangle 6.png";
import rect3 from "../../assets/images/Rectangle 9.png";
import rect4 from "../../assets/images/Rectangle 8.png";

import bg from "../../assets/images/bgims.jpg";

const slides = [rect, rect1, rect2, rect3, rect4];

export default function Banner() {
  return (
    <div
      className="w-full shadow relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`,
        minHeight: "300px",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/80 bg-opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between space-y-4 lg:space-y-0 min-h-[300px]">
        <div className="w-full lg:w-1/4">
          <PopularNav />
        </div>
        <div className="w-full lg:w-3/4">
          <HeroCarousel slides={slides} />
        </div>
      </div>
    </div>
  );
}
