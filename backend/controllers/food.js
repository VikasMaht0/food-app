import foodModel from "../models/food.js";
import fs from 'fs'

// Add food items
const addFood= async (req, res) =>{
    let image_filename= `${req.file.filename}`;
    const food= new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try{
        await food.save();
        res.json({success: true, message: "Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error in Adding Food"})
    }
}

// Remove food items
const removeFood= async (req, res) =>{
    try{
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () =>{}) // To remove image from the local
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error in Removing Food"})
    }
}

// List food items
const listFood= async (req, res) =>{
    try{
        const foods= await foodModel.find({});
        res.json({success: true, data: foods})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error in listing food"})
    }
}

export {addFood, removeFood, listFood}