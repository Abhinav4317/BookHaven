import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import BookCard from "../BookCard";

const SearchedBooks = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="p-4 min-h-full bg-[#F5F7F8]">
        <div className="text-xl text-center font-bold font-serif mb-4">
          Here are the relevant search results!
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((book, index) => (
            <BookCard
              key={index}
              id={book._id}
              title={book.bookTitle}
              author={book.authorName}
              image={book.imagePath}
              desc={book.bookDescription}
              price={book.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchedBooks;
