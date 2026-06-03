import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
const API = process.env.REACT_APP_API_URL;



function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState('');
  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'));

  } , [])
  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Logged Out Successfully :)");
    setTimeout(()=>{
      navigate('/login');

    } , 2000)


  }
  const [product, setproduct] = useState([])
  const fetchProducts = async ()=>{
    try {
      const url = `${API}/products`;
      const response = await fetch(url , { headers : {'authorization' : localStorage.getItem('token')}});
      const result = await response.json();
      // console.log(result);
      setproduct(result);
      
    } catch (err) {
      handleError(err);
      
    }
  }
  useEffect(()=>{
    fetchProducts()

  } , [])
  return (
    <div className='container'>
      <h1>Home</h1>
      <h3>Welcome , {loggedInUser}</h3>

      <button onClick={handleLogout}>Logout</button>
      <h2>Products</h2>
      {
        product.map((pro , idx)=>{
          return (
            <div key={idx}>
              <h4>{pro.name}</h4>
              <p>Price : {pro.price} Rs</p>
            </div>
          )

        })
      }

      <ToastContainer/>
      
    </div>
  )
}

export default Home