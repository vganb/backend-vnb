import express from 'express'
const router = express.Router()
import {
    postMessage
} from '../controllers/messageController.js'



// CRUD - CREATE READ UPDATE DELETE
// POST message
router.post('/', postMessage)








export default router