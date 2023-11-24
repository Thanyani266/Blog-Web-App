import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
axios.defaults.withCredentials = true

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (data) => {
        const response = await axios.post('http://localhost:5000/login', data, {withCredentials: true});
        localStorage.setItem('login', JSON.stringify({"userLogin": "True"}))
        toast.success("Logged in successfully")
        console.log(response.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!email || !password) {
            toast.error("Please provide value into each input field")
        }else{
            login({email, password})
            //window.location.href = ('/')
        } 
    }
  return (
    <MDBContainer style={{maxWidth: '600px', marginTop: '10%'}} className='border rounded-5 p-5'>
        <MDBTypography tag='h4' className='text-center mb-5'>User Login</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Email' id='email' type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='mb-3'/>
        <MDBBtn type='submit' className='w-100'>Login</MDBBtn> 
      </form>
      <MDBCardFooter className='text-muted text-center mt-4'>If you don't have an account, please register <Link to='/register'>here</Link>.</MDBCardFooter>
    </MDBContainer>
  )
}

export default Login
