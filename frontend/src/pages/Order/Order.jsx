import './Order.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const Order = () => {

  const { getTotalCartAmt, token, food_list, cartItems, url }= useContext(StoreContext);

  const [data, setData]= useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    postalcode: "",
    state: "",
    country: "",    
  })

  const onchangeHandler= (event) =>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data =>({...data, [name]:value}))
  }

  const placeOrder= async (event) =>{
    event.preventDefault();
    let orderItems= [];
    food_list.map((item) =>{
      if(cartItems[item._id]>0){
        let itemInfo= item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData= {
      address : data,
      items: orderItems,
      amount: getTotalCartAmt()+1,
    }
    let response= await axios.post(url+"/order/place", orderData, {headers: {token}})
    if(response.data.success){
      const {session_url}= response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }

  const navigate= useNavigate();

  useEffect(() =>{
    if(!token){
      alert("Login to proceed")
      navigate('/cart')
    }
    else if(getTotalCartAmt()===0){
      navigate('/cart')
      alert("Cart is empty")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='order flex flex-col items-start justify-between m-6 sm:flex-row sm:m-16 sm:gap-12 md:gap-20 lg:gap-40'>
      
      <div className="order-left w-full my-6 sm:m-0">
        <p className='title font-semibold text-xl mb-6 sm:mb-16 sm:text-2xl lg:text-3xl'>Delivery Informaton</p>
        <div className="multi-fields">
          <input name='firstname' onChange={onchangeHandler} value={data.firstname || ''} type="text" placeholder='First Name' required />
          <input name='lastname' onChange={onchangeHandler} value={data.lastname || ''} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={onchangeHandler} value={data.email || ''} type="email" placeholder='Email Address' required />
        <textarea name='address' onChange={onchangeHandler} value={data.address || ''} className='p-2 text-sm md:text-base' type="text" placeholder='Address' rows="3" required />
        <input name='phone' onChange={onchangeHandler} value={data.phone || ''} type="number" placeholder='Contact No' required />
        <div className="multi-fields">
          <input name='city' onChange={onchangeHandler} value={data.city || ''} type="text" placeholder='City' required />
          <input name='postalcode' onChange={onchangeHandler} value={data.postalcode || ''} type="text" placeholder='Postal Code' required />          
        </div>
        <div className="multi-fields">
          <input name='state' onChange={onchangeHandler} value={data.state || ''} type="text" placeholder='State' required />
          <input name='country' onChange={onchangeHandler} value={data.country || ''} type="text" placeholder='Country' required />
        </div>        
      </div>
      <div className="order-right w-full sm:w-3/4">
      <div className="cart-total flex flex-1 flex-col mb-8 gap-12">
          <h2 className='font-semibold text-xl sm:text-2xl lg:text-3xl'>Cart Total</h2>
          <div className="">
          <div className="card-total-details">
              <p>Subtotal</p>
              <p>&#8377; {getTotalCartAmt()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>&#8377; {getTotalCartAmt()===0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <p>&#8377; {getTotalCartAmt()===0 ? 0 : getTotalCartAmt()+30}</p>
            </div>
          </div>
          <button type='submit' className='text-white bg-[tomato] rounded-xl py-3 '>Proceed To Payment</button>
        </div>
      </div>

    </form>
  )
}

export default Order
