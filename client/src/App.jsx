import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import About from "./screens/About";
import RegisterPage from "./screens/RegisterPage";
import axios from "axios";
import LoginPage from "./screens/LoginPage";
import { UserContextProvider } from "./UserContext";
import Account from "./screens/Account";
import Shop from "./screens/Shop";
import Book from "./screens/Book";
import DeleteBook from "./screens/DeleteBook";
import LogOut from "./screens/LogOut";
import Blog from "./screens/Blog";
import NewBlog from "./screens/NewBlog";
import BlogSpecific from "./screens/BlogSpecific";
import SearchedBooks from "./screens/SearchedBooks";
import Orders from "./screens/Orders";
axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  const str = "upload";
  const str2 = "manage";
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/sell-your-book" element={<Account select={str} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/book/:id" element={<Book />} />
          <Route
            path="/sell-your-book/:id"
            element={<Account select={str} />}
          />
          <Route path="/delete/:id" element={<DeleteBook />} />
          <Route path="/manage" element={<Account select={str2} />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/blog-sp/:id" element={<BlogSpecific />} />
          <Route path="/search-books" element={<SearchedBooks />} />
          <Route path="/view-upload" element={<Account select={str2} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
