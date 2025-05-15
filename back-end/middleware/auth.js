const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("JWT error", err);
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        console.log("Token verified:", data);
        req.userdetails = data;
        next();
      }
    });
  } else {
    console.log("No token found");
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticate;
