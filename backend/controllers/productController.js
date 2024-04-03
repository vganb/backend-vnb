import mongoose from 'mongoose'
import Product from "../models/productModel.js";



// CREATE a new product
export  const addProduct = async (req, res) => {
    try {
        const {name, price, description, category, images} = req.body
        
        if(!name || !price || !description || !category || !images) {
            res.status(400)
            throw new Error('You need to enter all required fields:')
        }

        const product = await Product.create({name, price, description, category, images})
        
        if(!product){
            res.status(500)
            throw new Error('Something went wrong when creating the product')
        }

        res.status(201).json(product)
    
    } catch (err) {
        res.json({
            message:err.message
        })
    }

}

// // READ all products
export const getAllProducts = async (req, res) => {
try {
    const product = await Product.find()
    res.status(200).json({
        products:product,
        countOfProducts: product.length
    })


      
} catch (err) {
    res.json({
        message: err.message
    })
}
}

// READ product by ID
export const getProductById = async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({message:'ObjectId not valid'})
    }
    Product.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).json({message: 'Not found'})
        }
        res.status(200).json(data)
    })
}


// UPDATE product by ID

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('You need to provide a valid ObjectId')
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {new:true})

        if(!product) {
            res.status(404)
            throw new Error('Resource not found')
        }

        res.status(200).json(product)

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('You need to provide a valid ObjectId')
        }

        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            res.status(404)
            throw new Error('Resource not found')
        }

        res.status(200).json(product._id)

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

