import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet:  { breakpoint: { max: 1024, min: 464 },  items: 2 },
  mobile:  { breakpoint: { max: 464,  min: 0 },    items: 1 },
};

export default function HeroCarousel({ slides }) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={2000}
      keyBoardControl
      showDots={false}
      arrows={false}
      removeArrowOnDeviceType={['mobile']}
      containerClass="mx-auto py-3"
      itemClass="px-2"
    >
      {slides.map((src, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <img src={src} alt={`Slide ${i}`} className="w-full h-[296px] object-cover" />
        </div>
      ))}
    </Carousel>
  );
}
