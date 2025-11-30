const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true,
        },
        email : {
            type:String,
            required:true,
            trim:true,
            unique:true,
            match: [/.+\@.+\..+/, "Please eneter a valid email address"]
        },

        password :{
            type:String,
            required:true,
            minLength:6,
        },
        role : {
            type:String,
            enum :["customer","admin"],
            default: "customer"
        },
        
    },
    {timestamps:true}
);

// Password Hash middleware
// pre is a mongoose method which executed before into the database.
userSchema.pre("save",async function (next) {
    // hash of password has to be generated for the first and every time user modifies the password
    if(!this.isModified("password")) return next; // if the password id not modified then exit this func
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next;
});

//Match the user entered password to Hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);