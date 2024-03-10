import React from 'react';
import { Link } from 'react-router-dom';
const Contact = () =>{
  const token = localStorage.getItem('token');
  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));
  
  // Check if user data exists and then access the properties
  if (userData) {
    const { id, name, email } = userData;
    console.log(`User ID: ${id}`);
    console.log(`User Name: ${name}`);
    console.log(`User Email: ${email}`);
  } else {
    console.log('User data not found in localStorage');
  }
  if (token) {
    // Token exists, user is logged in
    console.log('User is logged in');
  } else {
    // Token doesn't exist, user is not logged in
    console.log('User is not logged in');
  }
  return (
    <section class="bg-white dark:bg-gray-900">
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    {token ? (
  <div>
    {/* Display user's name if available */}
    {userData && (
      
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Hey {userData.name} Contact Us</h2>
    )}
   </div>
) : (
  <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Hey Customer Contact Us</h2>
)}
         {token ? (
  <div>
    {/* Display user's name if available */}
    {userData && (
      
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Hey {userData.name}. Got any issue related to our service. Please contact us so that we can reach you out.</p>
    )}
   </div>
) : (
  <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Hey Customer. First time on our website and get any query related to our service. Contact Now.</p>
)}   
        
        <form action="#" class="space-y-8">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                
                {token ? (
  <div>
    {/* Display user's name if available */}
    {userData && (
      
      <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" value={userData.email} placeholder="ayush2202ksr@gmail.com" required />
    )}
   </div>
) : (
  <input type="email"  id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="ayush2202ksr@gmail.com" required />
)}  
               
            </div>
            <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              
              
                <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" class="py-3 px-5 text-sm font-medium text-center bg-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
    </div>
  </section>
  );
}
export default Contact;