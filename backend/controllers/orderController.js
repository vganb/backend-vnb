import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'



// CREATE order

export const createOrder = asyncHandler (async (req,res) => {
    const {productId, quantity} = req.body


    if(!productId || !quantity){
        res.status(400)
        throw new Error('You need to enter all fields')
    }

    const newOrder = new Order({
        user:req.userId,
        products: [{ quantity, product: productId}]
    })
    
    await newOrder.save()
    
    res.status(201).json({
        message: 'Order created successfully',
        order:newOrder
    })

})


// GET order by id

export const getOrder = asyncHandler (async (req, res) => {
try {

    const order = await Order.findOne({_id:req.params.orderId, user:req.userId}).populate('products.product')


    if(!order) {
        return res.status(404).json({
            message: 'order not found'
        })
    }


    res.status(200).json(order)

} catch (err) {
    res.status(500).json({
        message: err.message
        })
    }
})


// GET all orders from user
export const getAllOrders = asyncHandler (async (req, res) => {
    try {
    
        const order = await Order.find({user:req.userId}).populate('products.product');    
    
         if(!order || order.length === 0) {
            return res.status(404).json({
                message: 'order not found'
            });
        }
    
    
        res.status(200).json(order)
    
    } catch (err) {
        res.status(500).json({
            message: err.message
            })
        }
    })
