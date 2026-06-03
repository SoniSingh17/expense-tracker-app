import { Route, Routes , Navigate,  } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Signup  from './pages/Signup';
import Home from './pages/Home';

function App() {
  

  const PrivateRoute = ( {children} ) => {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    return isAuthenticated ? children : < Navigate to='/login' />

    
  }
  const PublicRoute = ({children}) =>{
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    return isAuthenticated ? <Navigate to='/home'/> : children;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element = { < Navigate to='/login'/>} />

        <Route path='/login' element = { <PublicRoute><Login /></PublicRoute>}/>
        <Route path='/signup' element = { <PublicRoute><Signup /></PublicRoute>}/>
        <Route path='/home' element = {<PrivateRoute><Home/></PrivateRoute>} />
      </Routes>
    


    </div>
  );
}

export default App;
