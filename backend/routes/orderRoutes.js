import express from 'express'
const router = express.Router()

import {
    createOrder, getOrder
} from '../controllers/orderController.js'

// Routes

router.post('/', createOrder)

router.get('/:orderId', getOrder)



export default router