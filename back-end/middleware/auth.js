const jwt = require("jsonwebtoken");

const athenticate = (req, res, next) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("JWT error", err);
        return res.status(401).json({ message: "unauthorised" });
      } else {
        console.log("Token verified:", data);
        console.log(token);
        req.userdetails = data;
        next();
      }
    });
  } else {
    console.log("No token found");
    res.status(401).send("Unauthorized!");
  }
};
module.exports = athenticate;
