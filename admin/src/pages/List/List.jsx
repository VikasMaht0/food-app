import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { MdDeleteForever } from "react-icons/md";

const List = ({url}) => {

  const [list, setList]= useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchList= async () =>{
    const response= await axios.get(`${url}/food/list`)
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood= async (foodId) =>{
    const response= await axios.post(`${url}/food/remove`, {id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(() =>{
    fetchList();
  },[])

  // Calculate the items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(list.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='list add flex flex-col justify-between w-4/5 bg-white m-4 p-8 rounded-xl'>
      
      <div className='list-table'>
      <p className='text-3xl font-semibold'>All Food List</p>
        <div className='list-table-format title bg-[#f9f9f9] mt-6'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {currentItems.map((item, i) => (
          <div key={i} className='list-table-format text-[#545454]'>
            <img className='w-16 rounded-md' src={`${url}/images/` + item.image} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <MdDeleteForever onClick={() => removeFood(item._id)} className='text-2xl text-red-600 cursor-pointer' />
          </div>
        ))}
      </div>
      <div className='pagination flex justify-center mt-1'>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className='text-[0.6rem]'>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;