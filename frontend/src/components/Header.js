import React, {useContext, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Header.css'
import { userContext } from '../App'
import { MDBBtn } from 'mdb-react-ui-kit'
import axios from 'axios'

const Header = () => {
  const user = useContext(userContext)
  
  const handleLogout = () => {
    axios.get('http://localhost:5000/logout')
    .then(res => {
      if(res){
        window.location.href = '/'
      }
    })
  }
  const [activeTab, setActiveTab] = useState("Home");
  
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab("Home")
    }else if (location.pathname === '/add') {
      setActiveTab("AddUser")
    }else if (location.pathname === '/about') {
      setActiveTab("About")
    }else if (location.pathname === '/login') {
      setActiveTab("Login")
    }else if (location.pathname === '/register') {
      setActiveTab("Register")
    }
  }, [location])
  return (
    <div className='header'>
      <p className='logo'>BlogSite</p>
      <div className='header-right'>
        <Link to='/'>
          <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>Home</p>
        </Link>
        {
          user.username ? 
          <Link to='/add'>
          <p className={`${activeTab === "AddUser" ? "active" : ""}`} onClick={() => setActiveTab("AddUser")}>Add Post</p>
        </Link> : ''
        }
        <Link to='/about'>
          <p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>About</p>
        </Link>
        {
          user.username ? 
          <Link to='/'>
            <MDBBtn onClick={handleLogout}>Logout</MDBBtn>
          </Link> :
          <>
          <Link to='/login'>
          <p className={`${activeTab === "Login" ? "active" : ""}`} onClick={() => setActiveTab("Login")}>Login</p>
          </Link>
          <Link to='/register'>
          <p className={`${activeTab === "Register" ? "active" : ""}`} onClick={() => setActiveTab("Register")}>Register</p>
          </Link>
          </>
        }
      </div>
    </div>
  )
}

export default Header
