import express from 'express'
const router = express.Router()

import {
    createOrder, getAllOrders, getOrder
} from '../controllers/orderController.js'
import { verifyToken } from '../middleware/authMiddleware.js'


// Routes

router.post('/', verifyToken, createOrder)

router.get('/:orderId',verifyToken, getOrder)

router.get('/',verifyToken, getAllOrders)





export default router