import './Add.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage]= useState(false);

  const [data, setData]= useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onChangeHandler= (event) =>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data =>({...data, [name] : value}))
  }

  const onSubmiHandler= async (event) =>{
    event.preventDefault();
    const formData= new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response= await axios.post(`${url}/food/add`, formData)
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add w-4/5 m-4 p-8 rounded-xl text-[#434343] text-base bg-white'>
      
      <form className="flex gap-16" onSubmit={onSubmiHandler}>
        <div className="add-img-upload flexi gap-6 flex-1">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='w-80 rounded-xl' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) =>setImage(e.target.files[0])} type="file" id='image' hidden required />
          <div className="add-product-name flexi gap-3">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter Product Name' required />
          </div>  
        </div>

        <div className="add-product-details flexi gap-8 flex-1">          
          <div className="add-product-desc flexi gap-3">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' cols='30' placeholder='Enter Product Description' required />
          </div>
            <div className="add-category flexi gap-3">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category" id="">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flexi gap-3">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='&#8377; 0' />
            </div>
            <button type='submit' className='add-btn w-32 px-8 py-2 rounded-2xl bg-black text-white'>Add</button>
        </div>        
      </form>

    </div>
  )
}

export default Add
