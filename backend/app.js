import express from 'express'
const app = express()
import productRoutes from './routes/productRoutes.js'


app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Routes
app.use('/api/product', productRoutes)

export default app


