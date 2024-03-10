import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [userCart, setUserCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/useraddtocart/${userData.id}`);
        setUserCart(response.data);
        const productPromises = response.data.map(item => axios.get(`http://localhost:8000/products/${item.product_id}`));
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.map(response => response.data);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, [userData.id]);
  const handleQuantityChange = async (newQuantity) => {
    try {
      // Update the quantity in the user's cart
      const updatedCartItem = { ...userCart, quantity: newQuantity };
      await axios.put(`http://localhost:8000/useraddtocart/${userCart.id}`, updatedCartItem);
      // Update local state with the new quantity
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const totalAmount = products.reduce((total, product, index) => {
    return total + (userCart && userCart[index].quantity) * (product && product.price);
  }, 0);

  return (
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
        <div className="mx-auto justify-center px-6">
          {products.map((product, index) => (
              <div key={index} className="rounded-lg md:w-2/3">
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                  src={product && `http://localhost:8000/${product.image}`}
                  alt={product && product.name}
                  className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{product && product.name}</h2>
                  <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                  <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    {' '}
                    -{' '}
                  </span>
                    <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={userCart && userCart[index].quantity }
                        min="1"
                        readOnly
                    />
                    <span
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => handleQuantityChange(quantity + 1)}
                    >
                    {' '}
                      +{' '}
                  </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{userCart && userCart[index].quantity * product.price}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}



        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>

                <p className="text-gray-700">₹{(totalAmount)}</p>

          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹120</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">

                  <p className="mb-1 text-lg font-bold">₹{totalAmount + 120} INR</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to='/addAddress'>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </Link>
        </div>
        </div>
      </div>
  );
};

export default Checkout;
