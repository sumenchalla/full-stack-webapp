const express = require("express");
const Checkout = require("../models/Chekcout");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const Order = require("../models/Orders");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private

router.post("/",protect,async(req,res)=>{
    const {checkoutItems, shippingAddress,paymentMethod,totalPrice} = req.body;
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message : "No items in checkout"});
    }

    try {
        // create a new checkout session
        const newCheckout = await Checkout.create({
            user : req.user._id,
            checkoutItems : checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid :false
        });
        console.log(`checkout created for the user : ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating the checkout session:",error);
        res.status(500).json({message:"Server Error"})
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after sucessful payement
// @acess Private

router.put("/:id/pay",protect, async(req,res)=>{
    const  {paymentStatus, paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout) {
            return res.status(404).json({message : "Checkout not found"});
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        }
        else{
            res.status(400).json({message :"Invalid payment status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize",protect,async(req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message : "Checkout not found"});
        }
        if(checkout.isPaid && !checkout.isFinalized){
            // create the final order based on the checkout details
            const finalOrder = await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod :checkout.paymentMethod,
                totalPrice :checkout.totalPrice,
                isPaid :true,
                paidAt : checkout.paidAt,
                isDelivered : false,
                paymentStatus :"paid",
                paymentDetails:checkout.paymentDetails,
            });

            // mark the checkout as finalized to prevent duplicate values

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete the associated cart
            await Cart.findOneAndDelete({ userID: req.user._id });
            // await Cart.findByIdAndDelete({userID:checkout.user._id});
            res.status(201).json({finalOrder});
        }
        else if(checkout){
            res.status(400).json({message:"Checkout already finalized"});
        }
        else{
            res.status(400).json({message:"Checkout is not paid"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})        
    }
});

module.exports = router;
