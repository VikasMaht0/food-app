import './Header.css'
import {assets} from '../../assets/assets'

const Header = () => {
  return (
    <div className='header shadow-custom h-56 m-4 mt-8 sm:h-72 sm:m-12 md:h-96 lg:h-[80vh] lg:m-16'>
        
        <div className="header-content bottom-4 left-4 md:bottom-8 md:left-8">
            <h2 className='text-3xl leading-none w-3/4 font-bold text-white sm:text-4xl sm:leading-tight md:w-1/2 lg:leading-snug lg:text-5xl'>Order your favourite food here</h2>
            <p className='text-white hidden text-xs md:text-sm md:w-3/4 md:flex lg:text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est reiciendis temporibus nisi similique maiores dolores quam? Id saepe eveniet, assumenda quo, ut earum officiis sint expedita beatae harum praesentium dolor!</p>
            <button className='border-none px-3 py-1 text-[0.5rem] bg-white text-[#747474] font-medium rounded-3xl shadow-customBtn
              sm:text-sm sm:px-4 sm:py-2 lg:px-5 lg:py-3 lg:text-base'>View Menu</button>
        </div>

    </div>
  )
}

export default Header
