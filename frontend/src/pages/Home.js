import React from 'react'
import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCardImage,
  MDBBtn,
  MDBIcon, 
  MDBInput} from 'mdb-react-ui-kit';

const Home = () => {
   
  return (
    <MDBContainer breakpoint="sm">
      <MDBContainer>
      <form className='d-flex input-group w-auto mx-auto mt-3' style={{maxWidth: '500px'}}>
            <MDBInput 
              type='search'
              label='Filter Posts' 
              placeholder='Filter Blogs by Category' 
              aria-label='Search' />
          </form>
      </MDBContainer>
      <h4  className='text-center my-3'>Featured Posts</h4>
      <MDBRow className='text-align-center mb-3'>
        <MDBCol size='4' >
         <MDBCard alignment='center' className='mt-5' style={{height: '450px'}}>
           <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' fluid alt='...' style={{height: '200px'}}/>
           <MDBCardBody>
             <MDBCardTitle>Musanda vho tumba murahu ha nndu</MDBCardTitle>
             <MDBCardText>Lorem shiytsa ddh uya gau nyamuka madi na maningo a no nga  a mu thu a do hwalahsi<Link to={`/view/1`} style={{color: '#3cb371'}}>show more</Link></MDBCardText>
             
               <span className='mt-4'>
               <MDBBtn color='none' style={{border: 'none'}}>
                <MDBIcon fas icon='trash' color='danger' size='lg'/>
               </MDBBtn>
               <Link to={`/update/1`} style={{marginLeft: '10px'}}><MDBBtn color='none' style={{border: 'none'}}>
                  <MDBIcon fas icon='edit'  size='lg' style={{color: '#55acee'}}/>
               </MDBBtn></Link>
             </span>
             
           </MDBCardBody>
           <MDBCardFooter className='text-muted'>Posted: 23 Nov 2021</MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
  )
}

export default Home
