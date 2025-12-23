const express = require("express");
const Product = require ("../models/Products");
const Cart = require ("../models/Cart");
const {protect} = require("../middleware/authMiddleware");


const router = express.Router();


//Helper function to get a cart by user Id or guest  Id
const getCart = async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }
    else if (guestId){
        return await Cart.findOne({guestId});
    }
    return null;
}

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public

router.post("/",async(req,res)=>{
    const {productId, size, color, quantity, guestId, userId} = req.body; 
    // console.log(req.body);
    try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({message:"Product not found"});

        // Determine if the user is loggined in or not
        let cart = await getCart(userId,guestId);

        //if cart exist we need to update it
        if(cart){
            const productIndex = cart.products.findIndex(
                (p)=> 
                    p.productId.toString() === productId &&  
                    p.size === size &&
                    p.color === color
                    // by doing this we can add same product with multiple varients of color and size
            );

            if(productIndex>-1){
                // This means the product already exists in carts we have just increase the quantity
                cart.products[productIndex].quantity+=quantity
            }
            else{
                // this means this is the first time you are adding this product to cart so push it
                cart.products.push({
                    productId,
                    name:product.name,
                    image: product.images[0].url,
                    price : product.price,
                    size,
                    color,
                    quantity,

                });
            }

            // Recalculate the total price of the cart
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + Number(item.price) * Number(item.quantity),
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            //create a new cart for the guest or user
            const newCart = await Cart.create({
                user : userId ? userId :undefined,
                guestId : guestId ? guestId : "guest_"+ new Date().getTime(),
                products :[
                    {
                        productId,
                        name :product.name,
                        image : product.images[0].url,
                        price : product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice : product.price*quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});        
    }
});

//@route PUT /api/cart
// @desc upadte the product quantity for aguest or logged-in user
// @access Public

router.put("/", async(req,res)=>{
    const {productId, quantity , size, color, guestId, userId} = req.body;

    try{
        let cart = await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message: "Cart not found"});

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId &&
            p.size === size && 
            p.color === color
        );

        if (productIndex > -1){
            //update qunatity
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity; 
            }
            else{
                cart.products.splice(productIndex,1); //Remove product if quantity is 0
            }

            cart.totalPrice = cart.products.reduce((acc,item)=> acc+ item.price*item.quantity ,0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({message : "Product not found in the cart"});
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message : "Internal server error"});
    }
});

// @route DELETE /api/cart
// @desc Rempove a product from the cart
// @access Public

router.delete("/", async(req,res)=>{
    const {productId , size, color, guestId, userId} = req.body;

    try{
        let cart = await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message: "Cart not found"});

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId &&
            p.size === size && 
            p.color === color
        );
        if (productIndex > -1){
            cart.products.splice(productIndex,1);

            cart.totalPrice = cart.products.reduce((acc,item)=> acc + item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({message : "Product not found in the cart"});
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message : "Internal server error"});        
    }
});

// @route GET /api/cart
// @desc GET logged-in user's or guest user's cart
// @access Public

router.get("/", async(req,res)=>{
    const {userId,guestId} = req.query;

    try {
        const cart = await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }
        else {
            res.status(404).json({message : "Cart not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Internal server error"});                
    }
});


// @route POST /api/cart/merge
// @desc Merge the guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  if (!guestId) {
    return res.status(400).json({ message: "guestId is required" });
  }

  try {
    // NOTE: your Cart schema uses `userID` (not `user`), so query that field
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userID: req.user._id });

    if (guestCart) {
      if (!Array.isArray(guestCart.products) || guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge the guest cart into user cart
        guestCart.products.forEach((guestItemRaw) => {
          // clone to avoid mutating guestCart document or copying _id
          const guestItem = Object.assign({}, guestItemRaw.toObject ? guestItemRaw.toObject() : guestItemRaw);

          // remove _id to avoid collisions when pushing into existing array
          if (guestItem._id) delete guestItem._id;

          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // if the item exists in user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the user cart
            userCart.products.push(guestItem);
          }
        });

        // Recompute total price
        userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting the guest cart", error);
          // Not fatal for merge — proceed
        }

        return res.status(200).json(userCart);
      } else {
        // if the user has no existing cart, assign the guest cart to the user
        guestCart.userID = req.user._id; // use userID field (matches schema)
        guestCart.guestId = undefined; // clear guestId
        // recompute totalPrice just in case
        guestCart.totalPrice = (guestCart.products || []).reduce((acc, item) => acc + item.price * item.quantity, 0);

        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // guestCart already merged or never existed — just return user's cart
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error("Cart merge error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;