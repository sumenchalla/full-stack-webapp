const jwt = require("jsonwebtoken");
const User = require("../models/user");


//Middleware tp protect routes

// protect middleware (fixed)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // payload uses user:{_id: ...} so read decoded.user._id
      req.user = await User.findById(decoded.user._id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, No token provided" });
  }
};


// Middleware to check the user is an admin
const admin = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message :"Not authorized as an admin"});
    }
};

module.exports = {protect,admin};