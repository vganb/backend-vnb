import express from 'express'
const app = express()
import productRoutes from './routes/productRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'


app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Routes
app.use('/api/product', productRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// middleware
app.use(notFound)
app.use(errorHandler)

export default app


