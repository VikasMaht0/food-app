import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmt, url}= useContext(StoreContext);

  const navigate= useNavigate();

  return (
    <div className='cart mx-4 my-12 sm:mx-16 sm:my-20 lg:mx-24'>
      
      <div className="cart-items">
        <div className="cart-items-title text-black text-[0.6rem] sm:text-lg">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, i) =>{
            if(cartItems[item._id]>0){
              return (
                <div key={i} className="">
                  <div className="cart-items-title cart-items-item text-[0.5rem] my-2 sm:text-sm md:my-3">
                    <img className='w-8 sm:w-12' src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>&#8377; {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>&#8377; {item.price * cartItems[item._id]}</p>
                    <TiDelete onClick={() =>removeFromCart(item._id)} className='cursor-pointer text-red-600 text-sm sm:text-2xl' />
                  </div>
                  <hr className='h-[1px] text-[#e2e2e2]'  />
                </div>

              )
            }
          })
        }
      </div>
      <div className="cart-bottom flex flex-col-reverse justify-between gap-20 mx-2 sm:flex-row lg:gap-40 sm:my-20">
        <div className="cart-total flex flex-1 flex-col gap-12">
          <h2 className='font-semibold text-2xl sm:text-3xl'>Cart Total</h2>
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
          <button onClick={() =>navigate('/order')} className='text-white bg-[tomato] rounded-xl py-3 '>Proceed To Checkout</button>
        </div>
        <div className="cart-prmocode flex flex-1">
          <div className="">
            <p className='text-[#555] font-medium text-sm md:text-lg my-10'>If you have a promo code, Enter it here </p>
            <div className="cart-promocode-input flex justify-between items-center bg-[#eaeaea] rounded-3xl lg:gap-24">
              <input className='bg-transparent outline-none text-xs py-2 px-6 md:text-base md:p-3' type="text" placeholder='Promo Code' />
              <button className='text-white bg-black rounded-3xl text-xs py-2 px-6 md:text-base md:py-3 md:px-10 '>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
