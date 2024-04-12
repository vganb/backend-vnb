import { Schema, model } from "mongoose";



const userSchema = new Schema({
    
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type:String, 
        required:true,
        unique:true
    },
    passwordHash: {
        type:String,
        required:true
    }
}, {timestamps:true})



userSchema.virtual('displayName').get(function() {
    return this.firstName + ' ' + this.lastName
  })




const User = model('user', userSchema)

export default User