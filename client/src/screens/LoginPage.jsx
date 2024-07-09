import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // Ensure withCredentials: true for cookies
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login unsuccessful. Please check your credentials.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="bg-cover bg-center h-full w-full"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/abstract-background-design-inspired-by-essence-learning-knowledge-school-setting_977107-1015.jpg')",
        }}
      >
        <div className="flex justify-center h-2/3 mt-4 w-full">
          <div className="flex flex-col gap-2 items-center bg-white bg-opacity-75 p-6 w-1/3 rounded-lg shadow-lg">
            <h1 className="text-primary">
              {"©"} 2024 <span className="text-secondary">book</span>Haven Inc
            </h1>
            <h1 className="font-serif text-4xl font-bold">Log In</h1>
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
            <div className="w-full mb-1">
              <button
                onClick={login}
                className="bg-black text-white py-2 px-3 w-full rounded-full"
              >
                Sign in to your account
              </button>
            </div>
            <div>
              <span className="text-gray-600">Haven{"'"}t registered yet?</span>
              <Link to={"/register"} className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
