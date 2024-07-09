import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the CSS for the editor

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [blogtext, setBlogtext] = useState("");

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("photos", file);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        const file = data.files[0];
        setPhoto(file.filename);
      });
    //console.log(file);
  };

  const removePhoto = (e) => {
    e.preventDefault();
    setPhoto("");
  };

  const createBlog = async (e) => {
    e.preventDefault();
    if (!title || !blogtext) {
      alert("Kindly fill all the fields that have been marked as compulsory.");
      return;
    }
    try {
      await axios.post("/create-blog", {
        title,
        photo,
        desc,
        blogtext,
      });
      alert("Blog Creation successful");
      setTitle("");
      setPhoto("");
      setBlogtext("");
      setDesc("");
    } catch (error) {
      console.error("Error:", error);
      alert("Blog Creation unsuccessful.");
    }
  };

  return (
    <div className="p-8 w-full min-h-screen flex flex-col gap-4 bg-zinc-900 text-white font-serif">
      <h1 className="text-center text-2xl underline">Create Your Blog Here.</h1>
      <div className="w-full">
        <label className="self-start text-left mb-2 text-2xl" htmlFor="text">
          Title{"*"}
        </label>
        <input
          id="text"
          type="text"
          placeholder="Title of your blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full !p-2 border !border-white !rounded-none self-start text-left !bg-gray-700"
        />
      </div>
      {photo ? (
        <div>
          <label className="text-left mb-2 text-2xl mb-2" htmlFor="file">
            Blog Image(optional)
          </label>
          <div className="mt-2 flex">
            <img src={photo} className="object-cover h-80" />
            <button
              onClick={removePhoto}
              className="cursor-pointer h-80 text-white bg-zinc-900 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <label className="self-start text-left mb-2 text-2xl" htmlFor="file">
            Blog Image(optional)
          </label>
          <input
            id="file"
            type="file"
            onChange={uploadPhoto}
            className="w-full !p-2 border !border-white !rounded-none self-start text-left !bg-gray-700"
          />
        </div>
      )}
      <div className="w-full">
        <label className="self-start text-left mb-2 text-2xl" htmlFor="desc">
          Description
        </label>
        <textarea
          id="desc"
          placeholder="What the blog is about?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full !p-2 border !border-white !rounded-none self-start text-left !bg-gray-700"
        />
      </div>
      <div className="w-full">
        <label className="self-start text-left mb-2 text-2xl" htmlFor="blog">
          Blog{"*"}
        </label>
        <ReactQuill
          id="blog"
          value={blogtext}
          onChange={setBlogtext}
          className="w-full !p-2 border !border-white !rounded-none self-start text-left text-white"
        />
      </div>
      <div className="w-full">
        <button
          onClick={createBlog}
          className="bg-gray-700 text-white w-full p-2 flex gap-2 justify-center items-center border border-white"
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
          Create
        </button>
      </div>
    </div>
  );
};

export default NewBlog;
