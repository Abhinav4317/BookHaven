import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogSpecific = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get(`/blog-sp/${id}`).then(({ data }) => {
      setBlog(data);
      setLoading(false); // Set loading to false after data is fetched
    });
  }, [id]);

  function formatDateTime(updatedAt) {
    const date = new Date(updatedAt);

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "UTC",
      timeZoneName: "short",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);

    return formattedDate.replace(",", "");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-16 pt-8 font-serif">
      <h1 className="text-4xl font-bold underline underline-green mb-3">
        {blog.blogTitle}
      </h1>
      <div className="text-gray-500 font-bold text-xl mb-2">
        {blog.blogDescription}
      </div>
      <hr className="border-gray-500 mb-2" />
      <div className="flex gap-2 mb-2">
        <div className="w-[15vh] h-[15vh] bg-gray-400 flex justify-center items-center">
          <div className="text-white text-md">Profile N/A</div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg text-gray-500 font-bold">
            {"By "}
            {blog.authorId && blog.authorId.name
              ? blog.authorId.name.toUpperCase()
              : "Unknown"}
          </h1>
          <h2 className="text-gray-400 text-md font-bold">
            {"UPDATED AT: "}
            {blog.updatedAt ? formatDateTime(blog.updatedAt) : "Unknown"}
          </h2>
        </div>
      </div>
      <hr className="border-gray-500 mb-4" />
      {blog.imagePath ? (
        <div className="w-full mb-4">
          <img className="w-[100vh]" src={blog.imagePath} />
        </div>
      ) : (
        <div></div>
      )}
      <div
        className="whitespace-pre-wrap text-gray-800 text-xl font-sans"
        dangerouslySetInnerHTML={{ __html: blog.blogData }}
      />
    </div>
  );
};

export default BlogSpecific;
