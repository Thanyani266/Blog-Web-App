import React, {useContext, useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import './Header.css'
import { userContext } from '../App'
import axios from 'axios'
import {
  MDBNavbar,
  MDBContainer,
  MDBTypography,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav
} from 'mdb-react-ui-kit';

const Header = () => {
  const user = useContext(userContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    axios.get('http://localhost:5000/logout')
    .then(res => {
      if(res){
        localStorage.removeItem("login");
        navigate(0)
      }
    })
  }
  
  return (
    <>
    <MDBNavbar expand='lg' light bgColor='light' className='nav-bar'>
        <MDBContainer fluid>
        <Link to='/'><MDBTypography tag='p' className='fw-bold fs-4 mt-3 mx-2'>BlogSite</MDBTypography></Link>
          
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={menuOpen}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBTypography tag='ul' className='d-flex align-items-center mx-auto'>
        <MDBTypography tag='li' className='mx-2'>
            <NavLink to='/' className='text-dark text-uppercase p-1'>Home</NavLink>
        </MDBTypography>
        
        {
          user.username ? 
          <MDBTypography tag='li' className='mx-2'>
          <NavLink to='/add' className='text-dark text-uppercase p-1'>New Post</NavLink> 
          </MDBTypography> : ""

        }
        
        <MDBTypography tag='li' className='mx-2'>
        <NavLink to='/about' className='text-dark text-uppercase p-1'>About</NavLink>
        </MDBTypography>
        {
          user.username ? 
          <MDBTypography tag='li' onClick={handleLogout} className='text-dark text-uppercase mx-2 logout' style={{cursor: 'pointer'}}>
              <span className='p-1'>Logout</span>
            </MDBTypography> :
          <>
          <MDBTypography tag='li' className='mx-2'>
            <NavLink to='/login' className='text-dark text-uppercase p-1'>Login</NavLink>
        </MDBTypography>
          <MDBTypography tag='li' className='mx-3'>
            <NavLink to='/register' className='text-dark text-uppercase p-1'>Register</NavLink>
        </MDBTypography>
        </>
          
        }
        </MDBTypography>
        {user.username ? 
        <MDBTypography tag='div' className='float-end'>Welcome, {user.username}</MDBTypography> : ""
        }
            </MDBNavbarNav>
           
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div className='menu'>
      <ul className={menuOpen ? 'open mt-4 text-center mb-3' : ''}>
      <MDBTypography tag='li' className='mb-2'>
            <NavLink to='/' className='text-dark text-uppercase p-1'>Home</NavLink>
        </MDBTypography>
      <li>{
          user.username ? 
          <MDBTypography tag='li' className='mb-2'>
          <NavLink to='/add' className='text-dark text-uppercase p-1'>New Post</NavLink> 
          </MDBTypography> : ""

        }</li>
      <MDBTypography tag='li' className='mb-2'>
        <NavLink to='/about' className='text-dark text-uppercase p-1'>About</NavLink>
        </MDBTypography>
        {
          user.username ? 
          <MDBTypography tag='li' onClick={handleLogout} className='text-dark text-uppercase mx-2 logout' style={{cursor: 'pointer'}}>
              <span className='p-1'>Logout</span>
            </MDBTypography> :
          <>
          <MDBTypography tag='li' className='mb-2'>
            <NavLink to='/login' className='text-dark text-uppercase p-1'>Login</NavLink>
        </MDBTypography>
          <MDBTypography tag='li' className='mb-2'>
            <NavLink to='/register' className='text-dark text-uppercase p-1'>Register</NavLink>
        </MDBTypography>
        
          </>
        }
    </ul>
    </div>
    </>
    
  )
}

export default Header
