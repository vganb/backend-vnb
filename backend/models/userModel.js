import { Schema, model } from "mongoose";
// import bcrypt from "bcryptjs"


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

//   matchar lösenordet som skickats in med hasningen på databasen


// ALT 2, krypterar losenordet varje gang en user sparas
// om losenordet andrats eller ar en ny user
//   userSchema.pre('save', async function(next) {
//     if(!this.isModified('passwordHash')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(15)
//     this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
//   })



const User = model('user', userSchema)

export default User