import React , { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
const API = process.env.REACT_APP_API_URL;



function Signup() {
    const  [SignupInfo, setSignupInfo] = useState({
        name : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        
        const { name , value } = e.target;
        console.log(name , value)
        const copySignupInfo = { ...SignupInfo };
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)

    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        const { name , email , password } = SignupInfo;
        if (!name || !email || !password){
            return handleError("All Fields are required !")

        }
        try {
            const url = `${API}/auth/sign-up`;
            const response = await fetch(url , {
                method : "POST",
                headers : {   
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(SignupInfo)
            });
            // console.log("Response object is : " , response);
            const result = await response.json();
            const { success , message , error } = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                } , 1000)
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
        <h1>  SignUp  </h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input onChange={handleChange} id='name' type="text" placeholder='Enter Your Name' name='name' autoFocus value={SignupInfo.name}/>
                
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange={handleChange} id='email' type="text" placeholder='Enter Your Email' name='email'  value={SignupInfo.email}/>
                
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input onChange={handleChange} id='password' type="password" placeholder='Enter Your Password' name='password'  value={SignupInfo.password}/>
                
            </div>
            <button type='submit'>SignUp</button>
            <span>Already have a Account ?
                <Link to='/login'>Login</Link>
            </span>

        </form>
        <ToastContainer/>



    </div>

  )
}

export default Signup