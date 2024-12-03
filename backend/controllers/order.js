import orderModel from "../models/order.js"
import usermodel from "../models/user.js"
import Stripe from "stripe"

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend
const placeOrder= async (req, res) =>{

    const frontend_url= "https://food-website-frontend.onrender.com"
    try{
        const newOrder= new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData: {}}); // Cleaning users cart data

        const line_items= req.body.items.map((item) =>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100,
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name: "Convenience Fee"
                },
                unit_amount: 1*100*50,
            },
            quantity: 1
        })
        // Creating a session
        const session= await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success: true, session_url: session.url})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const verifyOrder= async (req, res) =>{
    const {orderId, success}= req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "paid"})
        }
        else{
            res.json({success: false, message: "Not Paid"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// Users order for frontend
const userOrder= async (req, res) =>{
    try{
        const orders= await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// Fetching order for Admin panel
const listOrder= async (req, res) =>{
    try{
        const orders= await orderModel.find({});
        res.json({success: true, data: orders})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// Updating order status
const updateStatus= async (req, res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status})
        res.json({success: true, message: "Status updated"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {placeOrder, verifyOrder, userOrder, listOrder, updateStatus}
