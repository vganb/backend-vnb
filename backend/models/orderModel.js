import mongoose, { Schema, model} from "mongoose";



const orderSchema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
},
products: [
    {
        quantity: {
            type: Number,
            required:true
            },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    }
    
    }
]

})


const Order = model('order', orderSchema)

export default Order