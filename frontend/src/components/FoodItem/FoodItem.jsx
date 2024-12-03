import { useContext } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, description, price, image}) => {

    const {cartItems, addToCart, removeFromCart, url}= useContext(StoreContext);

  return (
    <div className='food-item w-full m-auto rounded-2xl cursor-pointer overflow-hidden hover:shadow-customBtn'>
      
        <div className="food-item-img-container w-full rounded-2xl relative">
            <img className='food-item-image w-full' src={url+"/images/"+image} alt="" />
            {
                !cartItems[id] ?
                <img className='add w-9 absolute bottom-4 right-4 rounded-full' onClick={() =>addToCart(id)} src={assets.add_icon_white} />
                : <div className='food-item-counter absolute flex items-center bottom-4 right-4 gap-2 p-1 rounded-3xl bg-white'>
                    <img onClick={() =>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() =>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info p-4">
            <div className="food-item-name-rating flex justify-between items-center mb-4">
                <p className='text-base font-bold'>{name}</p>
                <img className='w-20' src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc text-sm text-[#676767]'>{description}</p>
            <p className='food-item-price text-[tomato] text-lg font-bold my-4'>&#x20B9; {price}</p>
        </div>

    </div>
  )
}

export default FoodItem
