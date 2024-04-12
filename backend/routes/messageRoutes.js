import express from 'express'
const router = express.Router()
import {
    postMessage
} from '../controllers/messageController.js'




// create message
router.post('/', postMessage)








export default router