import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js';


// REGISTER user

export const registerUser = asyncHandler( async (req, res) => {
const {firstName, lastName, email, password} = req.body

if(!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('You need to enter all the fields')
}

const userExists = await User.exists({email: email})
if(userExists) {
    res.status(400)
    throw new Error('The email adress is already taken')
}

const salt = await bcrypt.genSalt(15)
const hashed = await bcrypt.hash(password, salt)



const user = await User.create({
    firstName, 
    lastName, 
    email,
    passwordHash:hashed
})





//  Generate token
const token = generateToken(user)



res.status(201).json({
    message: 'User created sucessfully',
    token:generateToken(token)
})
})




// LOGIN user
export const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('You need to enter all the fields')
    }

    const user = await User.findOne({ email })


    if(!user) {
        res.status(401)
        throw new Error('Incorrect credentials')
    }

    const result = await bcrypt.compare(password, user.passwordHash)

    if(!result) {
        res.status(401)
        throw new Error('Incorrect credentials')
    }

    res.status(200).json({
        "message": "Login successful",
        token:generateToken(user)
    })

})






// GET user profile

export const getUserProfile = asyncHandler( async (req, res) => {
  const user = await User.findById(req.userId)

  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName
   })
})



// UPDATE user profile


 export const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.userId)
    if(!user) {
        res.status(404)
        throw new Error('User not found')
      }

    
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName

    if(req.body.email){
        const userExists = await User.exists({email: req.body.email})
    if(userExists) {
        res.status(400)
        throw new Error('The email adress is already taken')
    }
    user.email = req.body.email
    }


    if(req.body.password) {
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        displayName: updatedUser.displayName
    })


})



