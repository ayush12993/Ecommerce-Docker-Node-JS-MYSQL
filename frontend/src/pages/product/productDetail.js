import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProductDetail = () => {
  const navigate = useNavigate();
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
  const [product, setProduct] = useState(null);
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        setProduct(response.data);

        // Fetch tag details
        const tagResponse = await axios.get(`http://localhost:8000/tags/${response.data.tag_id}`);
        setTag(tagResponse.data);

        // Fetch category details
        const categoryResponse = await axios.get(`http://localhost:8000/categories/${response.data.category_id}`);
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      // Format the current date and time in the required format
      const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      const data = {
        user_id: userData.id,
        product_id: product.id,
        quantity: quantity,
        added_at: formattedDate // Use the formatted date
      };
  
      // Make a POST request to add the product to the cart
      const response = await axios.post('http://localhost:8000/addtocart', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      navigate('/addAddress');
      console.log(response.data); // You can handle the response as needed
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  

  // Function to handle decreasing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle increasing quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value); // Update the quantity state as user types
  };

  if (!product || !tag || !category) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white pt-28">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">{category.name}</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">{tag.name}</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.name}</a>
            </li>
          </ol>
        </nav>


        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 sm:grid-cols-1">
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
          <img
  src={'http://localhost:8000' + product.image}
  alt={product.name}
  className="h-full w-full object-cover object-center"
/>

          </div>
          <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div>
                <h3 className="sr-only">Name</h3>
                <div className="space-y-6">
                  <h2 className="text-base text-gray-900">{product.name}</h2>
                </div>
              </div>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400"><span className="text-gray-600">{product.feature1}</span></li>
                    <li className="text-gray-400"><span className="text-gray-600">{product.feature2}</span></li>
                    <li className="text-gray-400"><span className="text-gray-600">{product.feature3}</span></li>
                    <li className="text-gray-400"><span className="text-gray-600">{product.feature4}</span></li>
                    <li className="text-gray-400"><span className="text-gray-600">{product.feature5}</span></li>
                  </ul>
                </div>
              </div>

              {token ? (
                <div>
                    {/* Display user's name if available */}
                    {userData && (
                           <form onSubmit={addToCart}>
                           <p className="text-3xl tracking-tight text-gray-900">₹{product.price}</p>
                {/*           <div className="flex items-center border-gray-100">*/}
                {/*  <span*/}
                {/*    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"*/}
                {/*    onClick={decreaseQuantity} // Decrease quantity function*/}
                {/*  >*/}
                {/*    {' '}*/}
                {/*    -{' '}*/}
                {/*  </span>*/}
                {/*  <input*/}
                {/*   type="number"*/}
                {/*   min="1"*/}
                {/*   value={quantity}*/}
                {/*   onChange={handleQuantityChange}*/}
                {/*   className="mt-2 w-20 px-3 py-1 border border-gray-300 rounded-md"*/}
                {/*    readOnly // Make the input read-only to prevent manual input*/}
                {/*  />*/}
                {/*  <span*/}
                {/*    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"*/}
                {/*    onClick={increaseQuantity} // Increase quantity function*/}
                {/*  >*/}
                {/*    {' '}*/}
                {/*    +{' '}*/}
                {/*  </span>*/}
                {/*</div>*/}


                             <div className="flex items-center border-gray-100">
                    <span
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={decreaseQuantity} // Decrease quantity function
                    >
                      {' '}
                      -{' '}
                    </span>
                               <input
                                   className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                   type="number"
                                   value={quantity} // Connect input value to quantity state
                                  onChange={handleQuantityChange}
                                   min="1"
                                   readOnly // Make the input read-only to prevent manual input
                               />
                               <span
                                   className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                   onClick={increaseQuantity} // Increase quantity function
                               >
                      {' '}
                                 +{' '}
                    </span>
                             </div>
                           <button type="submit" className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
                         </form>
                    )}
                </div>
            ) : (
              <a href='/login' className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login to Buy</a>
            )}

          
            </div>
          </div>
        </div>




      </div>
  </div>
  );
};

export default ProductDetail;
