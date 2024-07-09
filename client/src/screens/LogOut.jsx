import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LogOut = () => {
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);

  const handleYes = async () => {
    await axios.post("/logout");
    setUser(null); // Clear user state
    setRedirect("/");
  };

  const handleNo = () => {
    setRedirect("/");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div className="w-1/3 h-2/3 border border-2 border-yellow-500 text-center p-4">
        <h1 className="text-white">Are you sure you want to sign out?</h1>
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={handleYes}
            className="bg-zinc-800 shadow shadow-black shadow-md border border-yellow-500 border-2 px-4 text-white rounded-md"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-yellow-500 text-white rounded-md px-4 py-1"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
