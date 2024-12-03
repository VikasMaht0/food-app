import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center py-2 px-12 bg-white'>
    
        <img className='logo w-32' src={assets.logo} alt="" />
        <img className='profile w-9' src={assets.profile_image} alt="" />

    </div>
  )
}

export default Navbar
