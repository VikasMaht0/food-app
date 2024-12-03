import './Explore.css'
import { menu_list } from '../../assets/assets'

const Explore = ({category, setCategory}) => {
  return (
    <div className='explore flex flex-col mx-4 my-8 gap-5 sm:mx-8 sm:my-12 sm:gap-12 lg:mx-16' id='explore'>
      
      <h1 className='text-3xl text-[#262626] font-semibold sm:text-4xl lg:text-5xl'>Explore our menu</h1>
      <p className='explore-text text-xs text-[#808080] sm:w-3/4 sm:text-sm lg:text:base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis? Nemo doloremque vero provident maxime repellat placeat, nesciunt excepturi fugiat accusantium? Alias nemo laboriosam iure atque maiores quas quia rerum!</p>
      <div className="explore-list flex justify-between items-center text-center gap-8 overflow-x-scroll">
        {
            menu_list.map((item, i) =>{
                return(
                    <div onClick={() =>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} key={i} className="explore-list-item flex flex-col gap-4">
                        <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
      </div>
      <hr className='mx-8 h-1 bg-[#e2e2e2] border-none sm:mx-12 lg:mx-36 ' />

    </div>
  )
}

export default Explore
