import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js"
import 'dotenv/config'

// App config
const app= express()
const port= process.env.PORT || 3000;

// Middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// API endpoints
app.use("/images", express.static('uploads'))
app.use("/food", foodRouter)
app.use("/user", userRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)

app.get("/", (req, res) =>{
    res.send("API working")
})

app.listen(port, () =>{
    console.log(`Server listening at ${port}`)
})