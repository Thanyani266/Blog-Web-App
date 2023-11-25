import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!username || !email || !password) {
            toast.error("Please provide value into each input field")
        }else{
            axios.post('http://localhost:5000/register', {username, email, password});
            navigate('/login')
        } 
        
    }
  return (
    <MDBContainer style={{backgroundColor: '#ECEFF1', paddingTop: '8%', paddingBottom: '8%'}} fluid>
    <MDBContainer style={{maxWidth: '600px'}} className='bg-light bg-opacity-50 border rounded-5'>
        <MDBTypography tag='h4' className='fw-bolder text-muted text-center my-5'>Registration</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Username' id='username' type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)} className='mb-3'/>
        <MDBInput label='Email' id='email' type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='mb-3'/>
        <MDBBtn color='secondary' type='submit' className='w-100 text-dark btn-sec'>Register</MDBBtn> 
      </form>
      <hr className="hr hr-blurry" />
      <MDBCardFooter className='text-muted text-center mt-4 mb-5'>Already have an account? Login <Link to='/login'>here</Link>.</MDBCardFooter>
    </MDBContainer>
    </MDBContainer>
  )
}

export default Register
