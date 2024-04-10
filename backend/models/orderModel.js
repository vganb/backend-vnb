import mongoose, { Schema, model} from "mongoose";



const orderSchema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
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
        ref: 'product',
        required:true
    }
    
    }
]

})


const Order = model('order', orderSchema)

export default Order