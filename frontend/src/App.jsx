import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Loader from "./components/Loader/Loader";

// Lazy load the page components
const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Order = lazy(() => import("./pages/Order/Order"));
const Verify = lazy(() => import("./pages/Verify/Verify"));
const MyOrders = lazy(() => import("./pages/MyOrders/MyOrders"));

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}

      <Navbar setShowLogin={setShowLogin} />

      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorder" element={<MyOrders />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}