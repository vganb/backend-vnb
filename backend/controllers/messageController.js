import Message from "../models/messageModel.js"
import asyncHandler from 'express-async-handler'


// CREATE message
export const postMessage = asyncHandler (async (req, res) => {
    

        const {name, email, message} = req.body

        if(!name || !email || !message) {
            res.status(400)
            throw new Error('You need to enter all required fields: name, email and message')
        }
        const newMessage = await Message.create({name, email, message})

    
        if(!newMessage){
            res.status(500)
            throw new Error('Something went wrong when creating the product')
        }

        res.status(200).json({
            message: 'Message sent successfully'
        })

    
})



