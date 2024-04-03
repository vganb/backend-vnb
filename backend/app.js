import express from 'express'
const app = express()
import productRoutes from './routes/productRoutes.js'
import messageRoutes from './routes/messageRoutes.js'



app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Routes
app.use('/api/product', productRoutes)
app.use('/api/message', messageRoutes)

export default app


