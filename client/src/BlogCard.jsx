import { Link } from "react-router-dom";

const BlogCard = ({ id, title, author, desc, updatedAt }) => {
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
    <section className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="text-sm">{timeAgo(updatedAt)}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a>{title}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{desc}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-medium dark:text-white">
            {"By-"}
            {author}
          </span>
        </div>
        <Link
          to={"/blog-sp/" + id}
          className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline text-blue-500"
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default BlogCard;
