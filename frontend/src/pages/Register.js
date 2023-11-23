import { MDBBtn, MDBCardFooter, MDBContainer, MDBInput, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    
  return (
    <MDBContainer style={{maxWidth: '600px', marginTop: '8%'}} className='border rounded-5 p-5'>
        <MDBTypography tag='h4' className='text-center mb-5'>User Registration</MDBTypography>
      <form>
        <MDBInput label='Username' id='username' type='text' name='username' className='mb-3'/>
        <MDBInput label='Email' id='email' type='email' name='email' className='mb-3'/>
        <MDBInput label='Password' id='password' type='password' name='password' className='mb-3'/>
        <MDBBtn type='submit' className='w-100'>Register</MDBBtn> 
      </form>
      <MDBCardFooter className='text-muted text-center mt-4'>Already have an account? Login <Link to='/login'>here</Link>.</MDBCardFooter>
    </MDBContainer>
  )
}

export default Register
