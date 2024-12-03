import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { placeOrder, verifyOrder, userOrder, listOrder, updateStatus } from '../controllers/order.js';

const orderRouter= express.Router();

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/useorder", authMiddleware, userOrder)
orderRouter.get("/list", listOrder)
orderRouter.post("/status", updateStatus)

export default orderRouter;