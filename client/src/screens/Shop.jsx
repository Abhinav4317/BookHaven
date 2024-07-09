import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import BookCard from "../BookCard";

const Shop = () => {
  const [groupedBooks, setGroupedBooks] = useState({});

  useEffect(() => {
    axios.get("/books").then(({ data }) => {
      const books = data;
      const groups = {};

      books.forEach((book) => {
        const category = book.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(book);
      });

      setGroupedBooks(groups);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 min-h-full bg-[#F5F7F8]">
        <div className="text-xl text-center font-bold font-serif">
          Pick your next read from your favorite category!
        </div>
        {Object.keys(groupedBooks).map((category) => (
          <div key={category}>
            <div className="text-2xl font-bold my-4 p-4 rounded-md bg-blue-700 bg-opacity-70 font-serif text-white">
              {category}
            </div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {groupedBooks[category].map((book, index) => (
                <div key={index}>
                  <BookCard
                    id={book._id}
                    title={book.bookTitle}
                    author={book.authorName}
                    image={book.imagePath}
                    desc={book.bookDescription}
                    price={book.price}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
