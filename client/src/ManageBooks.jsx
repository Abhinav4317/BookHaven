import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/books-user")
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books.");
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-sans text-3xl font-bold mt-4 mb-8 text-left">
        Manage your intellectual weaponry!
      </h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="w-full min-h-screen rounded-md overflow-hidden">
        <table className="w-full border border-2 border-yellow-600 border-collapse min-h-screen">
          <thead>
            <tr className="text-left bg-yellow-600 text-white">
              <th className="px-2">NO.</th>
              <th>BOOK TITLE</th>
              <th>AUTHOR NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>EDIT/MANAGE</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(books).map((book, index) => (
              <tr key={index}>
                <td className="px-2">{index + 1}</td>
                <td>{book.bookTitle}</td>
                <td>{book.authorName}</td>
                <td className="underline underline-green">{book.category}</td>
                <td>{book.price ? `$${book.price}` : "NA"}</td>
                <td>
                  <Link
                    to={"/sell-your-book/" + book._id}
                    className="bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 px-4 text-white rounded-md"
                  >
                    EDIT
                  </Link>
                  {" / "}
                  <Link
                    to={"/delete/" + book._id}
                    className="bg-yellow-500 text-white rounded-md px-4 py-1"
                  >
                    DELETE
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
