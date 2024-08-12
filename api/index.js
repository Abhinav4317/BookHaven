const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Book = require("./models/Book");
const Blog = require("./models/Blog");
const Order = require("./models/Order");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const { upload } = require("./middlewares/multer.middleware");
const {
  uploadBufferToCloudinary,
  uploadImageFromUrlToCloudinary,
} = require("./utils/cloudinary");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin:
      "https://book-haven-m2n8ul5rm-abhinav-gangwars-projects.vercel.app/",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {});
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token").json(true);
});

app.post("/api/upload-book", async (req, res) => {
  const { title, author, imageURL, category, description, linkPDF, price } =
    req.body;
  const imagePath = await uploadImageFromUrlToCloudinary(imageURL);
  const userData = await getUserDataFromToken(req);
  try {
    const bookDoc = await Book.create({
      ownerId: userData.userId,
      bookTitle: title,
      authorName: author,
      imagePath: imagePath.secure_url,
      category,
      bookDescription: description,
      bookPDFURL: linkPDF,
      price,
    });
    res.json(bookDoc);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const booksDoc = await Book.find({});
    res.json(booksDoc);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.get("/api/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookDoc = await Book.findById(id);
    res.json(bookDoc);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.get("/api/books-user", async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    if (userData) {
      const booksDoc = await Book.find({ ownerId: userData.userId });
      res.json(booksDoc);
    } else {
      res.status(500).json({ msg: "error" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.put("/api/book-edit", async (req, res) => {
  const { id, title, author, imageURL, category, description, linkPDF, price } =
    req.body;
  const bookDoc = await Book.findById(id);
  let imagePath = "";
  if (imageURL) imagePath = await uploadImageFromUrlToCloudinary(imageURL);
  if (bookDoc) {
    try {
      if (imagePath) {
        bookDoc.set({
          bookTitle: title,
          authorName: author,
          imagePath: imagePath.secure_url,
          category,
          bookDescription: description,
          bookPDFURL: linkPDF,
          price,
        });
      } else {
        bookDoc.set({
          bookTitle: title,
          authorName: author,
          category,
          bookDescription: description,
          bookPDFURL: linkPDF,
          price,
        });
      }
      await bookDoc.save();
      res.json(bookDoc);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  } else {
    res.status(404).json({ msg: "book not found" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.post("/api/upload", upload.array("photos", 100), async (req, res) => {
  const files = req.files;
  try {
    const uploadPromises = files.map((file) =>
      uploadBufferToCloudinary(file.buffer)
    );
    const uploadResults = await Promise.all(uploadPromises);
    res.json({ files: uploadResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/create-blog", async (req, res) => {
  const { title, photo, desc, blogtext } = req.body;
  try {
    const userData = await getUserDataFromToken(req);
    if (userData) {
      try {
        const blogDoc = await Blog.create({
          authorId: userData.userId,
          blogTitle: title,
          imagePath: photo,
          blogDescription: desc,
          blogData: blogtext,
        });
        res.json(blogDoc);
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    if (userData) {
      try {
        const blogs = await Blog.find({ authorId: userData.userId }).populate(
          "authorId"
        );
        res.json(blogs);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    } else {
      res.status(500).send({ message: "Login/Signup first" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.get("/api/blog-sp/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogDoc = await Blog.findById(id).populate("authorId");
    res.json(blogDoc);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.get("/api/all-blogs", async (req, res) => {
  try {
    res.json(await Blog.find({}).populate("authorId"));
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.post("/api/payment", async (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase of property named: ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      {
        idempotencyKey: idempontencyKey,
      }
    );

    res.status(200).json(charge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/order", async (req, res) => {
  const { product, buyer, email, price } = req.body;
  try {
    const orderDoc = await Order.create({
      product,
      buyer,
      email,
      price,
    });
    res.status(200).json(orderDoc);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.get("/api/search", async (req, res) => {
  const { query } = req.query;
  try {
    const booksDoc = await Book.find({
      $or: [
        { bookTitle: { $regex: query, $options: "i" } },
        { authorName: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(booksDoc);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

app.get("/api/bought-books", async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    if (userData) {
      try {
        const boughtBooks = await Order.find({ buyer: userData.userId });
        res.json(boughtBooks);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    } else {
      res.status(500).send({ message: "Login/Signup first" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    if (userData) {
      try {
        const boughtBooks = await Order.find({ buyer: userData.userId })
          .populate("product")
          .populate("buyer");
        res.json(boughtBooks);
      } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
      }
    } else {
      res.status(500).send({ message: "Login/Signup first" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
{
  /**
here is the complete code if you want to populate database with json data
also make sure you create schema and model before trying to store data

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "bookData.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

function func() {
  Book.insertMany(data)
    .then(() => console.log("data inserted successfully"))
    .catch((err) => console.log(err));
}
func();

  
*/
}
