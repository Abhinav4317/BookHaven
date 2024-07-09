import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("/blogs").then(({ data }) => {
      console.log(data);
      setBlogs(data);
    });
  }, []);
  function timeAgo(updatedAt) {
    const now = new Date();
    const updatedTime = new Date(updatedAt);
    const timeDiff = now - updatedTime;

    const oneHour = 60 * 60 * 1000; // minutes * seconds * milliseconds
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

    if (timeDiff < oneHour) {
      return "within the last hour";
    } else if (timeDiff < oneDay) {
      const hoursAgo = Math.floor(timeDiff / (60 * 60 * 1000)); // Convert milliseconds to hours
      return `${hoursAgo} hours ago`;
    } else {
      const daysAgo = Math.floor(timeDiff / oneDay); // Convert milliseconds to days
      return `${daysAgo} days ago`;
    }
  }

  return (
    <div className="p-8 flex flex-col items-center gap-4 w-full min-h-screen bg-zinc-900 font-serif">
      <div className="font-serif text-4xl text-white">BLOGS</div>
      <Link
        to={"/new-blog"}
        className="text-xl bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 py-2 px-4 text-white rounded-full flex items-center justify-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create a Blog
      </Link>
      {blogs.length > 0 &&
        blogs.map((blog, index) => (
          <Link
            to={"/blog-sp/" + blog._id}
            key={index}
            className="w-full flex p-4"
          >
            <div className="w-1/5 border border-white">
              {blog.imagePath ? (
                <img className="w-full h-full" src={blog.imagePath} />
              ) : (
                <div className="bg-gray-700 flex justify-center items-center text-white w-full h-full">
                  Blog
                </div>
              )}
            </div>
            <div className="w-4/5 bg-gray-900 bg-opacity-75 flex flex-col gap-1 p-4 text-white">
              <div className="ml-auto">{timeAgo(blog.updatedAt)}</div>
              <div className="self-start text-left text-xl mb-4">
                {blog.blogTitle}
              </div>
              <div className="self-start text-left text-lg !text-gray-400 mb-2">
                {blog.blogDescription}
              </div>
              <div className="self-start text-left text-lg">
                <span className="text-gray-400">{"Created By-"}</span>
                {blog.authorId.name}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Blog;
