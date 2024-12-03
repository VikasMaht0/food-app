import { useContext, useEffect } from 'react';
import './Verify.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success= searchParams.get("success")
    const orderId= searchParams.get("orderId")
    const {url}= useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment= async () =>{
        const response= await axios.post(url+"/order/verify", {success, orderId})
        if(response.data.success){
            navigate("/myorder")
        }
        else{
            navigate("/")
        }
    }

    useEffect(() =>{
        verifyPayment();
    },[])

  return (
    <div className='verify h-[80vh] grid'>
      
        <div className="spinner w-16 h-16 place-self-center rounded-full"></div>

    </div>
  )
}

export default Verify
