import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
      setRedirect(true);
    } catch (error) {
      console.log(error);
      alert(`Registration unsuccessful: ${error.response.data.error}`);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10">
      <h1 className="text-primary text-3xl font-bold">
        <span className="text-secondary">book</span>Haven
      </h1>
      <div className="w-1/3 relative flex flex-col gap-2 justify-center items-center">
        <h1 className="font-serif text-4xl font-bold">Create Account</h1>
        <div className="w-full mb-2">
          <label className="self-start text-left mb-2" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your first and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full mb-2">
          <label className="self-start text-left mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full mb-2">
          <label className="self-start text-left mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full mb-4">
          <button
            onClick={register}
            className="bg-black text-white py-2 px-3 w-full text-white rounded-full"
          >
            Create Account
          </button>
        </div>
        <div>
          <h1>
            By creating an account, you agree to the Goodreads Terms of Service
            and Privacy Policy
          </h1>
          <span className="text-gray-500">Already have an account?</span>
          <Link to={"/login"} className="underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
