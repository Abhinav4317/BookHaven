import { useState } from "react";
import { Link } from "react-router-dom";
const BookCard = ({ id, title, author, image, desc, price }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const classes1 = "w-full p-2 text-white bg-black bg-opacity-80 rounded-lg";
  const classes2 = "w-full p-2 text-white bg-gray bg-opacity-80 rounded-lg";
  return (
    <div className="bg-white shadow shadow-black p-4 flex flex-col gap-2 items-center justify-center min-w-sm h-max rounded-md">
      <Link to={"/book/" + id} className="w-full h-[65vh] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-fit" />
      </Link>
      <Link
        to={"/book/" + id}
        className="self-start text-left font-bold text-2xl"
      >
        {title}
        <span className="text-gray-400 text-xl underline">
          {" by "}
          {author}
        </span>
      </Link>
      {price ? (
        <div className="self-start text-left text-lg">
          <span className="font-bold">Available at:</span>
          {" $"}
          {price}
        </div>
      ) : (
        <div className="self-start text-left text-gray-300">
          Physical copy not for sale currently.Digital version may be available.
        </div>
      )}
      <div>
        <div
          className={`text-gray-400${
            isExpanded
              ? ""
              : " overflow-hidden text-ellipsis whitespace-wrap h-[60px]"
          }`}
        >
          <span className="text-gray-600">What the book is about:</span>
          <br />
          {desc}
        </div>
        <button onClick={toggleExpand} className="bg-white text-blue-500">
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
      <div className="w-full">
        <button className={`${price ? classes1 : classes2}`}>Buy Now</button>
      </div>
    </div>
  );
};
export default BookCard;
