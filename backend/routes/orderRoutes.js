import express from 'express'
const router = express.Router()

import {
    createOrder, getOrder
} from '../controllers/orderController.js'
import { verifyToken } from '../middleware/authMiddleware.js'


// Routes

router.post('/', verifyToken, createOrder)

router.get('/:orderId', getOrder)



export default router