import Order from '../models/orderModel.js'




export const createOrder = async (req,res) => {
    const {user,productId, quantity} = req.body


    if(!user || !productId || !quantity){
        res.status(400)
        throw new Error('You need to enter all fields')
    }

    const newOrder = new Order({
        user,
        products: [{ quantity, product: productId}]
    })
    
    await newOrder.save()
    
    res.status(201).json({
        message: 'Order created successfully',
        order:newOrder
    })

}



export const getOrder = async (req, res) => {
try {
    console.log('order:ID', req.params.orderId)

    const order = await Order.findOne({_id:req.params.orderId}).populate('products.product')


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
}

// if(!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).json({message:'ObjectId not valid'})
// }
// Product.findById(req.params.id)
// .then(data => {
//     if(!data) {
//         return res.status(404).json({message: 'Not found'})
//     }
//     res.status(200).json(data)
// })