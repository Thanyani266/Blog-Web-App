import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import moment from 'moment'
import { MDBContainer, MDBRow, MDBCol, MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCardImage,
  MDBBtn,
  MDBIcon, 
  MDBInput} from 'mdb-react-ui-kit';
import Badge from '../components/Badge';
import { userContext } from '../App'

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const user = useContext(userContext);

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    const response = await axios.get('http://localhost:5000/posts')
    if (response.status === 200) {
      setData(response.data)
    }
  }

  const deletePost = async (id) => {
    if(window.confirm("Are you sure you want to delete the post?")){
      const response = await axios.delete(`http://localhost:5000/post/${id}`)
      if (response.status === 200) {
        toast.success(response.data);
        getPosts();
      }
    }
  }
  console.log(data);
  return (
    <MDBContainer style={{backgroundColor: '#ECEFF1'}} fluid className='px-5 py-4'>
      <MDBContainer className='bg-light bg-opacity-50 shadow-5 py-2'>
      <form className='d-flex input-group w-auto mx-auto' style={{maxWidth: '500px'}}>
            <MDBInput 
              type='search'
              label='Filter Blogs' 
              placeholder='Filter by Category(Travel, Fashion, Fitness, Sports, Food, Tech)' 
              aria-label='Search' 
              onChange={(event) => setSearchValue(event.target.value)}/>
          </form>
      </MDBContainer>
      <h4  className='text-center mt-3'>Featured Blogs</h4>
      <hr className="hr hr-blurry" />
      <MDBRow className='text-align-center mb-3'>
        {data && data.filter(item => item.category.toLowerCase().includes(searchValue)).map((item, index) => {
          return (
            <MDBCol xl='4' md='6' key={index}>
         <MDBCard alignment='center' className='bg-light bg-opacity-50 shadow-5 mt-5' style={{height: '450px'}}>
           <MDBCardImage src={`http://localhost:5000/${item.file}`} fluid alt={item.file} style={{height: '200px'}}/>
           <MDBCardBody>
             <MDBCardTitle className='blog-title text-uppercase bg-light border'>{(item.title)}</MDBCardTitle>
             <MDBCardText><span className='blog-desc' dangerouslySetInnerHTML={{__html: item.description}} /><Link to={`/view/${item.id}`} className='btn btn-outline-dark rounded-pill hover'><MDBIcon far icon="eye" className='me-1'/>see more</Link></MDBCardText>
             <Badge>{item.category}</Badge>
             {
               (user.username === item.username) ?
               <span className='mt-2'>
               <MDBBtn color='none' style={{border: 'none'}} onClick={() => deletePost(item.id)}>
                <MDBIcon fas icon='trash' color='danger' size='lg'/>
               </MDBBtn>
               <Link to={`/update?edit=${item.id}`} state={item} style={{marginLeft: '10px'}}><MDBBtn color='none' style={{border: 'none'}}>
                  <MDBIcon fas icon='edit'  size='lg' style={{color: '#55acee'}}/>
               </MDBBtn></Link>
             </span> : ''
             }
             
           </MDBCardBody>
           {(user.username === item.username) ?
           <MDBCardFooter style={{marginTop: '-10%'}} className='text-muted'>Posted {moment(item.modified).fromNow()}</MDBCardFooter> :
           <MDBCardFooter className='text-muted'>Posted {moment(`${item.modified}`).fromNow()}</MDBCardFooter>
           }
         </MDBCard>
        </MDBCol>)
        })}
      </MDBRow>
    </MDBContainer>     
  )
}

export default Home
