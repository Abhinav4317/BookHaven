import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
const Navbar = () => {
  const { user } = useContext(UserContext);
  function toSentenceCase(str) {
    if (!str) return str;
    const words = str.trim().split(/\s+/);
    let result =
      words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    for (let i = 1; i < words.length; i++) {
      result += " " + words[i].charAt(0).toUpperCase() + ".";
    }
    return result;
  }
  return (
    <header className="flex justify-between items-center px-4 py-4 bg-zinc-900">
      <Link to={"/"} className="flex gap-1 text-2xl font-bold text-yellow-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
        <h1>bookHaven</h1>
      </Link>
      <div className="flex gap-12 uppercase text-lg text-white">
        <Link to={"/"} className="hover:text-yellow-500">
          Home
        </Link>
        <Link to={"/about"} className="hover:text-yellow-500">
          About
        </Link>
        <Link to={"/shop"} className="hover:text-yellow-500">
          Shop
        </Link>
        <Link
          to={user ? "/sell-your-book" : "/"}
          className="hover:text-yellow-500"
        >
          Sell your book
        </Link>
        <Link to={"/blog"} className="hover:text-yellow-500">
          Blog
        </Link>
      </div>
      {user ? (
        <Link
          to={"/account"}
          className="flex gap-1 items-center justify-center bg-yellow-500 rounded-lg text-lg py-2 px-4 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          {!!user && <div>{toSentenceCase(user.name)}</div>}
        </Link>
      ) : (
        <div className="flex gap-2">
          <div>
            <Link
              to={"/login"}
              className="bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 py-2 px-3 w-full text-white rounded-md"
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              to={"/register"}
              className="bg-yellow-500 py-2 px-3 w-full text-white rounded-md"
            >
              SignUp
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
