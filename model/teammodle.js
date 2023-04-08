const mongoose=require("mongoose");
const validator=require('validator')


const teamSchema= new mongoose.Schema({
    teamname:{
        type: String,
        unique:true,
        required: [true, "Please Enter team Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],

    }, 
     candidate:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],

    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    studentNumber: {
        type: String,
        required: [true, "Please Enter Your student number"],
        maxLength: [8, "give your correct stdNo."],
        select: false,
    },
    contactNumber:{
        type:String,
        required:[true,"please enter your contact number"],
        maxLength:[10,"give your contact number"]
         
    }
})
const Team = mongoose.model("User", teamSchema);
module.exports =Team;