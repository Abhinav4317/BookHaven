import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    axios
      .get(`/book/${id}`)
      .then(({ data }) => {
        console.log(data);
        setBook(data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setBook({}); // Set an empty object or handle the error as appropriate
      });
  }, [id]);

  if (!book) {
    return null; // or return a loading indicator while data is being fetched
  }

  const handleYes = () => {
    axios
      .delete(`/delete/${id}`)
      .then(() => {
        console.log("data deleted");
        alert("Deletion successful");
        setRedirect(true);
      })
      .catch((error) => {
        console.log("error:", error);
        alert("Deletion unsuccessful");
      });
  };
  const handleNo = () => {
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={"/manage"} />;
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div className="w-1/3 h-2/3 border border-2 border-yellow-500 text-center p-4">
        <h1 className="text-white">
          Are you sure you want to delete the book titled {"'"}
          {book.bookTitle}
          {"'?"}
        </h1>
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={handleYes}
            className="bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 px-4 text-white rounded-md"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-yellow-500 text-white rounded-md px-4 py-1"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
