import { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './Login.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const Login = ({setShowLogin}) => {

  const {url, setToken}= useContext(StoreContext)

  const [currState, setCurrState]= useState("Login");

  const [data, setData]= useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler= (event) =>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data =>({...data, [name]:value}))
  }

  const onLogin= async (event) =>{
    event.preventDefault()
    let newUrl= url;
    if(currState==="Login"){
      newUrl+= "/user/login"
    }
    else{
      newUrl+= "/user/register"
    }
    const response= await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login absolute z-10 w-full h-full bg-[#00000090] grid'>
      
      <form onSubmit={onLogin} className="login-container place-self-center text-[#808080] bg-white flex flex-col rounded-lg
        text-xs p-4 py-12 m-12 gap-6 sm:text-sm sm:p-7 sm:py-16  lg:text-base lg:py-12">
        <div className="login-title flex justify-between items-center text-black">
          <h2 className='font-semibold text-xl sm:text-2xl lg:text-3xl'>{currState}</h2>
          <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} 
            className='cursor-pointer w-2 sm:w-3 lg:w-4' alt="" />
        </div>
        <div className="login-input flex flex-col gap-2 sm:gap-4">
          {
            currState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Username' required />
          }
          
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <div className="login-condition flex items-start mt-6 md:mt-10 gap-1">
          <input className='sm:mt-1' type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button type='submit' className='text-white bg-[tomato] rounded-lg p-2 text-sm lg:text-base'>{currState==="Sign Up" ? "Create account" : "Login"}</button>
        {
          currState==="Login" ? <p>Create a new account? <span onClick={() =>setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() =>setCurrState("Login")}>Login here</span></p>
        }  
        
      </form>

    </div>
  )
}

export default Login
