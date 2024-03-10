import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderRazorpay from './RenderRazorpay.js';

const AddAddress = () => {
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
const [orderDetails, setOrderDetails] = useState({
  orderId: null,
  currency: null,
  amount: null,
 });
  const [streetAddress, setStreetAddress] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(''); // Assuming userId is available in localStorage
  const [addresses, setAddresses] = useState([]);
  const handleCreateOrder = async (amount, currency) => {
    const data = await axios.post( 'http://localhost:8000/order',
     {
      amount: amount*100, //convert amount into lowest unit. here, Dollar->Cents
      currency,
      keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
      KeySecret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
     }
    );
  
    if(data && data.order_id){
      setOrderDetails({
        orderId: data.order_id,
        currency: data.currency,
        amount: data.amount,
      });
      setDisplayRazorpay(true);
  }};
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const storedUserId = userId;
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/address/2');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/address',
        {
          street_address: streetAddress,
          addressline1: addressLine1,
          addressline2: addressLine2,
          postalcode: postalCode,
          city: city,
          state: state,
          country: country,
          userid: userId
        },
        { headers: { Authorization: token } }
      );
      const addressId = response.data.id; // Assuming your API returns the new address ID
      // Clear form inputs after successful submission
      setStreetAddress('');
      setAddressLine1('');
      setAddressLine2('');
      setPostalCode('');
      setCity('');
      setState('');
      setCountry('');
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Add Address</h1>
    <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
      <div className="mx-auto justify-center px-6">

      {addresses.map((address, index) => (
        <div key={index} class="flex bg-white items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
        <input  id={`address-${index}`} type="radio" value={address.id} name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor={`address-${index}`} for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <div className="p-6">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-800">{address.street_address}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-2">{address.addressline1}</p>
      <p className="text-sm text-gray-600 mb-2">{address.addressline2}</p>
      <p className="text-sm text-gray-600 mb-2">{address.city}, {address.state}, {address.country}</p>
      <p className="text-sm text-gray-600 mb-2">Postal Code: {address.postalcode}</p>
      {/* Radio button */}
    
    </div>
        </label>
    </div>
  
))}


      </div>
      <div className="flex pl-12 justify-center items-center pt-8">
        <div className="w-full max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-1" >
            <div className="block p-4">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Add Address</h2>
              <div className="mt-12 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
                  <div className="mt-1">
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} id="streetAddress" name="streetAddress" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="addressLine1" className="block text-sm font-medium leading-6 text-gray-900">Address Line 1</label>
                  <div className="mt-1">
                    <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} id="addressLine1" name="addressLine1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="addressLine2" className="block text-sm font-medium leading-6 text-gray-900">Address Line 2</label>
                  <div className="mt-1">
                    <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} id="addressLine2" name="addressLine2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
                  <div className="mt-1">
                    <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} id="postalCode" name="postalCode" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                  <div className="mt-1">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="city" name="city" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                  <div className="mt-1">
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} id="state" name="state" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                  <div className="mt-1">
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} id="country" name="country" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save
                </button>
              </div>
            </div>
          </form>
          <div>
    <button 
      onClick={() => handleCreateOrder(100, 'USD')}
    >Place Order
    </button>

  {displayRazorpay && (
  <RenderRazorpay
    amount={orderDetails.amount}
    currency={orderDetails.currency}
    orderId={orderDetails.orderId}
    keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
    keySecret={process.env.REACT_APP_RAZORPAY_KEY_SECRET}
  />
  )}
  </div>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default AddAddress;
