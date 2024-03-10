import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if (token) {
    // Token exists, user is logged in
    console.log('User is logged in');
  } else {
    // Token doesn't exist, user is not logged in
    console.log('User is not logged in');
  }
// Retrieve user data from localStorage
const userData = JSON.parse(localStorage.getItem('user'));
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};
const toggleMainMenu = () => {
  setIsMainMenuOpen(!isMainMenuOpen);
};
// Check if user data exists and then access the properties
if (userData) {
  const { id, name, email } = userData;
  console.log(`User ID: ${id}`);
  console.log(`User Name: ${name}`);
  console.log(`User Email: ${email}`);
} else {
  console.log('User data not found in localStorage');
}
  const handleLogout = () => {
    // Clear session data from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };
  return (

  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </a>
      </div>
      <div class="flex lg:hidden">
      <button type="button" onClick={toggleMainMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
  <span className="sr-only">Open main menu</span>
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
</button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <Link to="/" class="text-sm font-semibold leading-6 text-gray-900">Home</Link>
        <Link to="/shop" class="text-sm font-semibold leading-6 text-gray-900">Shop</Link>
        <Link to="/about" class="text-sm font-semibold leading-6 text-gray-900">About</Link>
        <Link to="/contact" class="text-sm font-semibold leading-6 text-gray-900">Contact</Link>
        <div className="relative">
            <Link to="/cart" className="text-sm font-semibold leading-6 text-gray-900">
             Cart
            </Link>
            {/* Optional badge for indicating items in the cart */}
            {/* <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></div> */}
          </div>
      </div>
      {token ? (
  <div class="hidden lg:flex lg:flex-1 lg:justify-end">
    {/* Display user's name if available */}
    {userData && (
      <span class="text-sm font-semibold leading-6 text-gray-900 pr-2">
        Welcome, {userData.name}!
      </span>
    )}
    <button onClick={handleLogout} class="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></button>
  </div>
) : (
  <div class="hidden lg:flex lg:flex-1 lg:justify-end">
    <Link to="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
  </div>
)}

     
    </nav>
   
    <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" onClick={toggleMobileMenu} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</Link>
                <Link to="/shop" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</Link>
                <Link to="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</Link>
                <Link to="/contact" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</Link>
              </div>
              <div className="py-6">
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </header>
    
  );
};

export default Navbar;
