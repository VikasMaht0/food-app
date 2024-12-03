import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import {assets} from '../../assets/assets'

const MyOrders = () => {

    const [data, setData]= useState([]);
    const {url, token}= useContext(StoreContext);

    const fetchOrder= async () =>{
        const response= await axios.post(url+ "/order/useorder", {}, {headers: {token}})
        setData(response.data.data);
        console.log(response.data.data)
    }

    useEffect(() =>{
        if(token){
            fetchOrder();
        }
    },[token])

  return (
    <div className='myorders min-h-[20vh] m-4 sm:m-10 md:m-16'>
      
      <h2 className='font-semibold text-2xl sm:text-3xl lg:text-4xl'>My Orders</h2>
      <div className="container flex flex-col sm:gap-8 mt-8">
        {
            data.map((order, i) =>{
                return(
                    <div key={i} className="my-orders-order grid place-items-center text-[#454545] gap-6 p-2 text-xs sm:text-sm md:text-base sm:gap-10 lg:gap-16">
                        <img className='w-10' src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, i) =>{
                            if(i===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+" , "
                            }
                        })}</p>
                        <p>&#8377; {order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span className='text-[tomato]'>&#x25cf;</span><b className='font-medium ml-1 text-[#454545]'>{order.status}</b></p>
                        <button onClick={fetchOrder} className='rounded-3xl bg-[#ffe1e1] text-[#454545] text-xs sm:text-base px-3 py-2'>Track Order</button>
                    </div>
                )
            })
        }
      </div>

    </div>
  )
}

export default MyOrders
