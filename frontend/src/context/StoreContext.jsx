import { createContext, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url= "https://food-website-backend-2b8f.onrender.com"; // URL for everywhere

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      toast("Added to Cart");
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      toast("Added to Cart");
    }
    if (token) {
      await axios.post(url + "/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast("Removed from Cart");
    if (token) {
      await axios.post(url + "/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmt = () => {
    let totalAmt = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmt += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Product with id ${item} not found in food_list`);
        }
      }
    }
    return totalAmt;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/food/list");
    setFoodList(response.data.data);
    setLoading(false); // Set loading to false once data is fetched
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmt,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {loading ? <Loader /> : props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
