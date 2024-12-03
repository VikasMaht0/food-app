import { useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import {assets} from "../../assets/assets"

const Orders = ({url}) => {

  const [orders, setOrders]= useState([]);

  const fetchAllOrders= async () =>{
    const response= await axios.get(url+"/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const statusHandler= async (event, orderId) =>{
    const response= await axios.post(url+"/order/status",{
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() =>{
    fetchAllOrders()
  },[])

  return (
    <div className='order add w-4/5 bg-white m-4 p-8 rounded-xl '>

      <h3 className='text-3xl font-semibold'>Orders</h3>
      <div className="order-list">
        {
          orders.map((order, i) =>(
            <div key={i} className="order-item grid items-start gap-4 p-4 my-6 text-sm text-[#505050]">
              <img src={assets.parcel_icon} alt="" />
              <div className="">
                <p className="order-item-food">
                  {
                    order.items.map((item, i) =>{
                      if(i===order.items.length-1){
                        return item.name+" x "+item.quantity
                      }
                      else{
                        return item.name+" x "+item.quantity+", "
                      }
                    })
                  }
                </p>
                <p className="order-item-name my-4">{order.address.firstname+" "+order.address.lastname}</p>
                <div className="order-item-address mb-2">
                  <p>{order.address.address+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.postalcode}</p>
                </div>
                <p className='order-item-contact'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Amount: &#8377; {order.amount}</p>
              <select onChange={(event) =>statusHandler(event, order._id)} value={order.status}
                className='bg-[#ffefec] border border-red-500 rounded-2xl p-2 outline-none'>
                <option value="Processing">Processing</option>
                <option value="Order Picked">Order Picked</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
