import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// Setting the port for the server to listen on, using the environment variable PORT or defaulting to 8080
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongoDB Connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}


connectDB()


export default connectDB