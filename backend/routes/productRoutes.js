import express from 'express'
const router = express.Router()
import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js'



// CRUD - CREATE READ UPDATE DELETE
// create
router.post('/', addProduct)

// read
router.get('/', getAllProducts)

router.get('/:id', getProductById)

// update
router.put('/:id', updateProduct)


// delete
router.delete('/:id', deleteProduct)








export default router