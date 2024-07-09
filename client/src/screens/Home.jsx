import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import Navbar from "../Navbar";
import axios from "axios";
import Footer from "../Footer";
import BlogCarousel from "../BlogCarousel";
import pic from "../assets/pic.jpg";
import SearchedBooks from "./SearchedBooks";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    axios.get("/books").then(({ data }) => {
      setBooks(data.slice(0, 15));
    });
  }, []);
  useEffect(() => {
    axios.get("/all-blogs").then(({ data }) => {
      //console.log(data);
      setBlogs(data);
    });
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("/search", {
        params: { query },
      })
      .then(({ data }) => {
        setResult(data);
        setNavigate(true);
      })
      .catch((err) => console.log(err));
  };
  if (navigate) {
    return <Navigate to={"/search-books"} state={result} />;
  }
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex w-full h-[75vh] bg-zinc-900">
        <div className="flex flex-col justify-center gap-6 w-3/6 h-full p-32">
          <div className="text-white text-5xl font-bold">Buy and Sell your</div>
          <div className="text-yellow-300 text-5xl font-bold">
            <span className="text-white">books</span> for the best
          </div>
          <div className="text-yellow-300 text-5xl font-bold">prices</div>
          <div className="text-white">
            Explore more books and keep track of the ones you want to read by
            adding them to your wishlist.
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Title/Genre/Author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="!w-1/2 border border-black my-1 !py-2 px-3 !bg-white !rounded-none"
            />
            <button
              onClick={handleSearch}
              className="!bg-zinc-800 !shadow !shadow-black !shadow-md !border !border-yellow-500 !border-2 !py-2 !px-3 !text-white !rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-3/6 h-full">
          <img
            src={pic}
            alt=""
            className="object-cover w-full h-full bg-zinc-800"
            style={{ border: "none" }}
          />
        </div>
      </div>
      <div className="pt-4">
        <div className="text-2xl font-bold my-4 p-4 rounded-md bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 font-serif text-white px-2 mx-4">
          Explore New Reads!
        </div>
        <Carousel items={books} />
      </div>
      <div>
        <div className="text-2xl font-bold mb-4 p-4 rounded-md bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 font-serif text-white px-2 mx-4">
          Read Informative Blogs!
        </div>
        <BlogCarousel items={blogs} />
      </div>
      <div className="py-4">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
