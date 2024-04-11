import { Schema, model} from "mongoose";

function arrayLimit(val) {
    return val.length <= 4;
  }



const productSchema = new Schema({
    name: { type:String, required:true},
    price: {type:Number, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    images:{type:[String], required:true, validate:[arrayLimit, '','','','']}


},{timestamps:true})


const Product = model('product', productSchema)


export default Product