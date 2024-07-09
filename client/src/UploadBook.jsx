import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UploadBook = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [linkPDF, setLinkPDF] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/book/" + id).then((response) => {
      const { data } = response;
      setTitle(data.bookTitle);
      setAuthor(data.authorName);
      setDescription(data.bookDescription);
      setCategory(data.category);
      setLinkPDF(data.bookPDFURL);
      setPrice(data.price);
    });
  }, [id]);
  const uploadBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !imageURL || !category) {
      alert("Kindly fill all the fields that have been marked as compulsory.");
      return;
    }
    try {
      await axios.post("/upload-book", {
        title,
        author,
        imageURL,
        category,
        description,
        linkPDF,
        price,
      });
      alert("Upload successful");
      setTitle("");
      setAuthor("");
      setImageURL("");
      setCategory("");
      setDescription("");
      setLinkPDF("");
      setPrice("");
    } catch (error) {
      console.error("Error:", error);
      alert("Upload unsuccessful.");
    }
  };
  const editBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/book-edit", {
        id,
        title,
        author,
        imageURL,
        category,
        description,
        linkPDF,
        price,
      });
      alert("Edit successful");
      setTitle(title);
      setAuthor(author);
      setImageURL(imageURL);
      setDescription(description);
      setCategory(category);
      setLinkPDF(linkPDF);
      setPrice(price);
    } catch (error) {
      console.error("Error:", error);
      alert("Edit unsuccessful.");
    }
  };
  return (
    <div className="pl-4 pr-20 flex flex-col gap-12">
      <h1 className="font-sans text-3xl font-bold mt-8">
        {id ? "Edit your book!" : "Let the world read your thoughts!"}
      </h1>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="text">
              Book Title{"*"}
            </label>
            <input
              id="text"
              type="text"
              placeholder="Title of the Book"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="text">
              Author Name{"*"}
            </label>
            <input
              id="text"
              type="text"
              placeholder="Author of the Book"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="text">
              Book Image URL{"*"}
            </label>
            <input
              id="text"
              type="text"
              placeholder="URL of Cover Image"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="text">
              Book Category{"*"}
            </label>
            <input
              id="text"
              type="text"
              placeholder="Genre of the Book"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="self-start text-left mb-2" htmlFor="text">
            Book Description
          </label>
          <textarea
            id="text"
            placeholder="Description of your book"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="text">
              Book PDF Link
            </label>
            <input
              id="text"
              type="text"
              placeholder="Link to buy digital copy of the book"
              value={linkPDF}
              onChange={(e) => setLinkPDF(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div className="w-1/2">
            <label className="self-start text-left mb-2" htmlFor="number">
              Price($)
            </label>
            <input
              id="number"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
          </div>
        </div>
        {id ? (
          <button onClick={editBook} className="primary">
            Edit Book
          </button>
        ) : (
          <button onClick={uploadBook} className="primary">
            Upload Book
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadBook;
