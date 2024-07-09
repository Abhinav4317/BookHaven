import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import StripeCheckout from "react-stripe-checkout";
import { UserContext } from "../UserContext";
const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [product, setProduct] = useState("");
  const [buyer, setBuyer] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const { user } = useContext(UserContext);
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
  useEffect(() => {
    if (!book) return;
    setProduct(book._id);
    setPrice(book.price);
  }, [book]);
  useEffect(() => {
    if (!user) return;
    setBuyer(user.userId);
    setEmail(user.email);
  }, [user]);
  if (!book) {
    return null; // or return a loading indicator while data is being fetched
  }
  const makePayment = (token) => {
    const body = {
      product: { name: book.bookTitle, price: book.price },
      token,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post("/payment", body, {
        headers: headers,
      })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          axios
            .post("/order", {
              product,
              buyer,
              email,
              price,
            })
            .then(() => {
              //console.log(response);
              alert("Product successfully booked!Thanks for shopping!");
            })
            .catch((err) => {
              console.log(err);
              alert("Booking unsuccessful.Kindly try again.");
            });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbar />
      <div className="flex gap-4 w-full min-h-screen font-serif bg-[#F5F7F8]">
        <div className="w-1/3 min-h-screen flex flex-col items-end gap-4 p-4">
          <div className="w-2/3 h-2/3">
            {book && book.imagePath && (
              <img
                src={book.imagePath}
                alt=""
                className="object-fit rounded-r-xl mx-4 mb-4"
              />
            )}
            {book.price && user && (
              <StripeCheckout
                stripeKey={import.meta.env.VITE_KEY}
                token={makePayment}
                name={`Buy "${book.bookTitle}"`}
                amount={book.price * 100}
              >
                <button className="!cursor-pointer !text-white !bg-green-700 !bg-opacity-90 !py-3 !px-2 !w-full !rounded-full !mb-4 !text-center">
                  Buy A Physical Copy{" @ "}
                  {book.price ? book.price : "0"}
                  {"$"}
                </button>
              </StripeCheckout>
            )}
            {book.price && !user && (
              <button
                onClick={() => {
                  alert("Kindly sign-in before attempting to buy a product.");
                }}
                className="!cursor-pointer !text-white !bg-green-700 !bg-opacity-90 !py-3 !px-2 !w-full !rounded-full !mb-4 !text-center"
              >
                Buy A Physical Copy
              </button>
            )}
            {!book.price && (
              <button
                onClick={() => {
                  alert(
                    "Product not for sale currently.Inconvenience is regretted."
                  );
                }}
                className="!cursor-pointer !text-white !bg-gray-700 !bg-opacity-90 !py-3 !px-2 !w-full !rounded-full !mb-4 !text-center"
              >
                Buy A Physical Copy
              </button>
            )}
            <Link
              to={book.bookPDFURL}
              className="cursor-pointer bg-white py-3 px-2 w-full border border-green-500 border-2 rounded-full flex justify-center items-center"
            >
              Buy PDF
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="w-2/3 p-4 flex flex-col gap-2">
          <div className="italic font-serif text-2xl text-gray-400">
            {"#International Bestseller"}
          </div>
          <div className="font-serif font-bold text-4xl">{book.bookTitle}</div>
          <div className="font-serif text-2xl underline">
            {"By "}
            {book.authorName}
          </div>
          <div className="text-xl">{book.bookDescription}</div>
          <div className="text-2xl flex gap-6 items-center">
            <span className="text-gray-400 text-xl">{"Genre(s)"}</span>
            <span className="underline underline-green">{book.category}</span>
          </div>
          {book.price ? (
            <div className="self-start text-left text-lg font-serif">
              <span className="font-bold">Currently Available at:</span>
              {" $"}
              {book.price}
            </div>
          ) : (
            <div className="self-start text-left text-gray-400">
              Physical copy not for sale currently. Digital version may be
              available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
