import { useState } from "react";
import BookCard from "./BookCard";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 3));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 text-2xl text-white"
          onClick={handlePrev}
          style={{ backgroundColor: "transparent" }}
        >
          &lt;
        </button>
      )}
      <div className="flex items-center overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex-none sm:w-1/6 md:w-1/5 lg:w-1/4 p-2 mx-2"
            >
              <BookCard
                id={item._id}
                title={item.bookTitle}
                author={item.authorName}
                image={item.imagePath}
                desc={item.bookDescription}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
      {currentIndex < items?.length - 3 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 text-2xl text-white"
          onClick={handleNext}
          style={{ backgroundColor: "transparent" }}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Carousel;
