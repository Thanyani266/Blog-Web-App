import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    
  return (
    <MDBContainer style={{maxWidth: '600px', marginTop: '10%'}} className='border rounded-5 p-5'>
        <MDBTypography tag='h4' className='text-center mb-5'>User Login</MDBTypography>
      <form>
        <MDBInput label='Email' id='email' type='email' name='email'className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' className='mb-3'/>
        <MDBBtn type='submit' className='w-100'>Login</MDBBtn> 
      </form>
      <MDBCardFooter className='text-muted text-center mt-4'>If you don't have an account, please register <Link to='/register'>here</Link>.</MDBCardFooter>
    </MDBContainer>
  )
}

export default Login
