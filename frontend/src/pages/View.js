import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBTypography,
  MDBIcon,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
  MDBCardFooter
} from 'mdb-react-ui-kit';

const View = () => {
  
  return (
    <MDBContainer className='mx-auto mt-5 mb-5' style={{width: '70%'}}>
      <Link to='/' ><strong>Go Back</strong></Link>
      <MDBTypography tag='h2' className='text-muted text-center mt-2'>Byr Bye Thanyi's ghost</MDBTypography>
      <img src='https://mdbootstrap.com/img/new/standard/nature/184.webp'
      fluid='true' className='rounded' 
      alt='...' style={{width: '100%', maxHeight: '400px'}}/>
      <div style={{marginTop: '20px'}}>
        <div style={{height: '43px', background: '#d6d6d6'}}>
          <MDBIcon style={{float: 'left'}} className='mt-4 ms-1' far icon='calendar-alt' size='lg'/>
          <strong style={{marginLeft: '4px', float: 'left', marginTop: '12px'}}>23 Aug 2078</strong>
        </div>
        <MDBTypography className='lead md-0 mb-3'>
          Muthatha wa mbangiseni u gai zwino? Kha vha fhindule ri sathu vharwa nga mulatela.
        </MDBTypography>
        
          <div style={{height: '50px'}}>
          <Link to={`/update/1`}><MDBBtn style={{float: 'left', background: '#55acee'}}>
          <MDBIcon fas icon='edit'  size='lg' color='white'/>
          </MDBBtn></Link>
          <MDBBtn style={{float: 'right'}} className='bg-danger'>
          <MDBIcon fas icon='trash' color='white' size='lg'/>
          </MDBBtn>
          </div>
        
      </div>
        <MDBCardFooter className='text-muted text-center'>Author: Tsgindwami</MDBCardFooter>
      
      <hr className='text-success fw-bold'/>
      <MDBTypography tag='h4' className='fw-bold text-center'>Related Posts</MDBTypography>
      <MDBRow className='text-align-center mb-3'>
        <MDBCol size='4' md={4}>
        <Link to={`/view/1`} >
         <MDBCard alignment='center' className='mt-5' style={{height: '450px'}}>
           <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' fluid alt='...' style={{height: '200px'}}/>
           <MDBCardBody>
             <MDBCardTitle className='text-dark'>Raja Casablanco maswodzi a mmbwa</MDBCardTitle>
             <MDBCardText className='text-muted'>I dont know what do to seriosd am confused and shokec d at thgs same time</MDBCardText>
           </MDBCardBody>
         </MDBCard>
         </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default View

