const express = require("express");
const dbconnect = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/user.routes");
const blog = require("./routes/blog.routes");
const app = express();

app.use(cors({ origin: "https://blog-front-end-0bz2.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(user);
app.use(blog);

dbconnect();
app.listen(process.env.PORT, (err) => {
  console.log("Server is running!");
});
