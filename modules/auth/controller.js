// encryption module
const bcrypt = require("bcryptjs")
// mongoose user model
const User = require ("./user.model")

// signup handling
async function signUp(req, res) {
    try {
        // gets user data in req.body
        const {email, password} = req.body
        console.log(req.body);
        // checks for missing data
        if (!email || !password) {
            return res.status(400).json({message: "Password and email are required!"})
        }
        // checks for existing user
        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(400).json({message: "Email already in use"})
        }
        // hashes password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //creates user in db
        const user = await User.create({email, password: hashedPassword})
        // returns user
        return res.status(200).json({email, id: user.id})

    } catch (error) {
        return res.status(500).json(error)
    }
}

async function login(req, res) {
    try {
        // gets user data in req.body
        const {email, password} = req.body
        // checks for missing data
        if (!email || !password) {
            return res.status(400).json({message: "Password and email are required!"})
        }
        // checks for existing user
        const userExists = await User.findOne({email})
        if (!userExists){
            return res.status(400).json({message: "User not found, please Signup"})
        }
        // compares saved password with user input
        const isValidUser = await bcrypt.compare(password, userExists.password)
        // if no match, returns message
        if (!isValidUser){
            return res.status(400).json({message: "Sorry, wrong password."})
        }
        // creates user in session
        req.session.user = {email, id:userExists.id}
        // return session user to client
        return res.status(200).json(req.session.user)

    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = {signUp, login}