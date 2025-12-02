const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Products");
const User = require("./models/user");
const products = require("./data/products");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);

//FUnction to populate the data

const seedData = async() =>{
    try {
        //clear the existing data
        await Product.deleteMany();
        await User.deleteMany();

        // create a default admin user 
        const createdUser = await User.create({
            name: 'Admin User',
            email : 'admin@example.com',
            password : '123456',
            role : 'admin',
        });

        // Assign the default user ID to each product
        const userId = createdUser._id;
        const sampleProducts = products.map((product)=>{
            return {...product,user : userId};
        });

        //Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");
        process.exit();
        
    } catch (error) {
        console.error("Error sedding the data",error);
        process.exit(1);
    }
};

seedData();