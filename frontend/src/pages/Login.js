import React , { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
const API = process.env.REACT_APP_API_URL;



function Login() {
    const  [LoginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        
        const { name , value } = e.target;
        console.log(name , value)
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)

    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const { email , password } = LoginInfo;
        if (!email || !password){
            return handleError("All Fields are required !")

        }
        try {
            const url = `${API}/auth/login`;
            const response = await fetch(url , {
                method : "POST",
                headers : {   
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(LoginInfo)
            });
            // console.log("Response object is : " , response);
            const result = await response.json();
            const { success , message , error , jwt_token , name  } = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token' , jwt_token);
                localStorage.setItem('loggedInUser' ,name);
                setTimeout(()=>{
                    navigate('/home')
                } , 3000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
            // console.log(result);
            
        } catch (error) {
            console.log("Fetched error  : " ,  error);
            
        }
    }
    // console.log("SignupInfo : " , SignupInfo)
  return (
    <div className='container'>
        <h1>  Login  </h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange={handleChange} id='email' type="text" placeholder='Enter Your Email' name='email'  value={LoginInfo.email}/>
                
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input onChange={handleChange} id='password' type="password" placeholder='Enter Your Password' name='password'  value={LoginInfo.password}/>
                
            </div>
            <button type='submit'>Login</button>
            <span>Don't have an account?
                <Link to='/signup'>Sign Up</Link>
            </span>

        </form>
        <ToastContainer/>



    </div>

  )
}

export default Login