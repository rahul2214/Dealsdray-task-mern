import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            password: hashedPassword
        });


        if (newUser) {
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }

    } catch (error) {
        console.log("Error in signUp controller",error.message);
        res.status(500).json({ error: error.message });
    }
    console.log("SignUp User");
};
export const login =async (req, res) => {

    try {
        const {username,password} = req.body;
        const user = await User.findOne({ username});
        const isPasswordCorrect= await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: 'Invalid password or username'});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
        })

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const logout = (req, res) => {
try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Loged out successfully"})
} catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
};