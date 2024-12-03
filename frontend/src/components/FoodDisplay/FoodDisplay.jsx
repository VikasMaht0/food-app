import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list}= useContext(StoreContext)

  return (
    <div className='food-display m-8 sm:m-12 lg:m-16' id="food-display">
      <h2 className='text-3xl font-bold sm:text-4xl lg:text-5xl'>Top dishes near you</h2>
      <div className="food-display-list">
        {
            food_list.map((item, i) =>{
              {console.log(category, item.category);}
              if(category==="All" || category===item.category){
                return <FoodItem key={i} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }    
            })
        }
      </div>
    </div>
  )
}

export default FoodDisplay
