import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [bought, setBought] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("/books-user")
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
    axios
      .get("/blogs")
      .then(({ data }) => setBlogs(data))
      .catch((err) => console.log(err));
    axios
      .get("/bought-books")
      .then(({ data }) => {
        setBought(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="p-8 flex flex-col gap-4 mr-96 font-serif">
      <div className="text-3xl font-bold">Dashboard</div>
      <hr className="border-black" />
      <div className="flex gap-2">
        <div className="w-20 h-20 rounded-full bg-purple-500 bg-opacity-80 text-white flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm">Currently signed-in as:</h2>
          <h1 className="font-bold text-xl">{user.name}</h1>
          <h2 className="text-lg">
            {"@"}
            {user.email}
          </h2>
        </div>
      </div>
      <hr className="border-black" />
      <div className="flex gap-4">
        <div className="bg-green-200 w-80 h-32 rounded-lg p-4">
          <h1 className="text-lg font-bold font-sans">Good day,</h1>
          <h1 className="text-lg font-bold font-sans mb-2">
            {user.name.split(" ")[0]}
          </h1>
          <h2 className="text-md font-sans bg-white inline p-2 rounded-md">
            Welcome to bookHaven© 2024
          </h2>
        </div>
        <div className="bg-yellow-200 w-80 h-32 rounded-lg p-4 relative">
          <h1 className="text-lg font-bold font-sans mb-2">
            {books.length >= 10
              ? "You are a prolific contributor,"
              : "You are a rookie contributor,"}
          </h1>
          <h1 className="text-lg font-bold font-sans mb-2">
            having put up{" "}
            <span className="text-md font-sans bg-white inline py-2 px-4 rounded-md">
              {books.length} books
            </span>
          </h1>
          <h1 className="text-lg font-bold font-sans mt-2">for sale.</h1>
          <Link
            to={"/view-upload"}
            className="block absolute bottom-0 right-0 bg-white p-2 rounded-tl-md border border-yellow-200 text-blue-400"
          >
            View
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-red-200 w-80 h-32 rounded-lg p-4 relative">
          <h1 className="text-lg font-bold font-sans">
            {bought.length >= 10
              ? "You are a experienced reader,"
              : "You are a rookie reader,"}
          </h1>
          <h1 className="text-lg font-bold font-sans my-2">
            having bought{" "}
            <span className="text-md font-sans bg-white inline py-2 px-4 rounded-md">
              {bought.length} books
            </span>
          </h1>
          <h1 className="text-lg font-bold font-sans mt-2">as of yet.</h1>
          <Link
            to={"/orders"}
            className="block absolute bottom-0 right-0 bg-white p-2 rounded-tl-md border border-red-200 text-blue-400"
          >
            View
          </Link>
        </div>
        <div className="bg-purple-200 w-80 h-32 rounded-lg p-4 relative">
          <h1 className="text-lg font-bold font-sans mb-2">
            {blogs.length >= 10
              ? "You are a prolific writer,"
              : "You are a rookie writer,"}
          </h1>
          <h1 className="text-lg font-bold font-sans mb-2">
            having written{" "}
            <span className="text-md font-sans bg-white inline py-2 px-4 rounded-md">
              {blogs.length} blogs
            </span>
          </h1>
          <h1 className="text-lg font-bold font-sans mt-2">till now.</h1>
          <Link
            to={"/blog"}
            className="block absolute bottom-0 right-0 bg-white p-2 rounded-tl-md border border-purple-200 text-blue-400"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
