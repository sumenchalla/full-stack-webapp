const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const checkoutRoutes = require("./Routes/checkoutRoutes");
const orderRoutes = require("./Routes/ordersRoutes");
const uploadRoutes = require("./Routes/uploadRoutes");
const subscribeRoutes = require("./Routes/subscribeRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const adminProductRoutes = require("./Routes/productAdminRoutes");
const adminOrderRoutes = require("./Routes/adminOrderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


const PORT = process.env.PORT || 3000;

// connecting to DB
connectDB();


app.get("/",(req,res)=>{
    res.send("Welocme to rabbit API");
})

// API User Routes
app.use("/api/users",userRoutes);

// API Products Routes
app.use("/api/products",productRoutes);

// API cart Routes
app.use("/api/cart",cartRoutes);

// API checkout Routes
app.use("/api/checkout",checkoutRoutes);

// API order Routes
app.use("/api/order",orderRoutes);

// API uplaod Routes
app.use("/api/upload",uploadRoutes);

// API subscribe Routes
app.use("/api/subscribe",subscribeRoutes);



// Admin Routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",adminProductRoutes);
app.use("/api/admin/products",adminOrderRoutes);


app.listen(PORT,()=>{
    console.log(`Server is runnning on http://localhost:${PORT}`);
    
})