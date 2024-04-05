import Message from "../models/messageModel.js"

export const postMessage = async (req, res) => {
    
    try {
        const {name, email, message} = req.body

        if(!name || !email || !message) {
            res.status(400)
            throw new Error('You need to enter all required fields')
        }
        const pMessage = await Message.create({name, email, message})

    
        if(!pMessage){
            res.status(500)
            throw new Error('Something went wrong when creating the product')
        }

        res.status(200).json({
            message: 'Message sent successfully'
        })

    } catch (err) {
        res.json({
            message:err.message
        })
    }
}



