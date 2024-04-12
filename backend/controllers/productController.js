import mongoose from 'mongoose'
import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler'




// CREATE a new product
export  const addProduct = asyncHandler (async (req, res) => {
        const {name, price, description, category, images} = req.body
        
        if(!name || !price || !description || !category || !images) {
            res.status(400)
            throw new Error('You need to enter all required fields: name, price, descipriton, category and at least 1 image')
        }

        if(images && images.length > 4) {
            res.status(400)
            throw new Error('Maximum of 4 images can be uploaded')
        }
        const product = await Product.create({
            name, 
            price, 
            description, 
            category, 
            images})
        
        if(!product){
            res.status(500)
            throw new Error('Something went wrong when creating the product')
        }

        res.status(201).json(product)
  
    
})

// // READ all products

export const getAllProducts = asyncHandler (async (req, res) => {
    // if(!product) {
    //     res.status(404)
    //     throw new Error('User not found')
    //   }
    
    const product = await Product.find()
    
    res.status(200).json({
        products:product,
        countOfProducts: product.length
    })
})


// READ product by ID
export const getProductById = asyncHandler (async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)) {
        // res.status(400).json({message:'ObjectId not valid'})
        res.status(400)
        throw new Error('ObjectId not valid')
    }


        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error('You need to input an correct product ID');
        }

        res.status(200).json(product);
   
})


// UPDATE product by ID

export const updateProduct = asyncHandler (async (req, res) => {

        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('You need to provide a valid product ID')
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {new:true})

        if(!product) {
            res.status(404)
            throw new Error('You need to input an correct product ID')
        }

        res.status(200).json(product)

    
})

// DELETE product 

export const deleteProduct = asyncHandler (async (req, res) => {

        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('You need to provide a valid product ID')
        }

        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            res.status(404)
            throw new Error('You need to input an correct product ID')
        }

        res.status(200).json(product._id)
  
})

