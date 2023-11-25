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
    <MDBContainer style={{backgroundColor: '#ECEFF1', paddingTop: '8%', paddingBottom: '8%'}} fluid>
    <MDBContainer style={{maxWidth: '600px'}} className='bg-light bg-opacity-50 border rounded-5'>
        <MDBTypography tag='h4' className='fw-bolder text-muted text-center my-5'>Login</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Email' id='email' type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='mb-3'/>
        <MDBBtn color='secondary' type='submit' className='w-100 btn-sec text-dark'>Login</MDBBtn> 
      </form>
      <hr className="hr hr-blurry" />
      <MDBCardFooter className='text-muted text-center mt-4 mb-5'>If you don't have an account, please register <Link to='/register'>here</Link>.</MDBCardFooter>
    </MDBContainer>
    </MDBContainer>
  )
}

export default Login
