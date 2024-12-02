const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});
        if (user) {
            return res.status(409)
                .json({message: 'User already exists, you can login', success: false});
        }
        const newUser = new userModel({name, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201)
            .json({
                message: "Sign up Successful", success: true
            })
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500)
            .json({
                message: "Internal server error", success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        const errorMsg = "Email or Password is wrong";
        if (!user) {
            return res.status(403)
                .json({message: errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({message: errorMsg, success: false});
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({
                message: "Login Success", 
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500)
            .json({
                message: "Internal server error", success: false
            })
    }
}


module.exports = {
    signup,
    login
}