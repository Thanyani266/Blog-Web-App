import React, {useContext, useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
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
import Badge from '../components/Badge';
import { toast } from 'react-toastify';
import { userContext } from '../App';

const View = () => {
  const [post, setPost] = useState(null);
  const [data, setData] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
  const user = useContext(userContext)

  useEffect(() => {
    if(id) {
        getSinglePost(id)
    }
  }, [id])

  useEffect(() => {
    getPosts();
  }, [])

  const getSinglePost = async (id) => {
    const response = await axios.get(`http://localhost:5000/post/${id}`)
    if (response.status === 200) {
        setPost({...response.data[0]});
      }
  }

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
        navigate('/');
      }
    }
  }
  const filteredData = data.filter(post => post.id !== id)
  const dataByCategory = filteredData.filter(item => item.category === (post && post.category))

  const styleInfo = {
    display: 'inline',
    marginRight: '5px',
    float: 'right',
    marginTop: '7px'
  }

  return (
    <MDBContainer style={{backgroundColor: '#ECEFF1', paddingTop: '8%', paddingBottom: '8%'}} fluid>
    <MDBContainer className='mx-auto mb-5' style={{width: '70%'}}>
      <Link to='/' ><strong className='btn btn-outline-dark'><MDBIcon far icon="caret-square-left" className='me-1'/>Go Back</strong></Link>
      <MDBTypography tag='h2' className='text-muted text-center mt-2'>{post && post.title}</MDBTypography>
      <img src={`http://localhost:5000/${post && post.file}`} 
      fluid='true' className='rounded' 
      alt={post && post.file} style={{width: '100%', maxHeight: '400px'}}/>
      <div style={{marginTop: '20px'}} className='mb-2'>
        <div className='band align-items-center mb-3' style={{height: '43px', background: '#d6d6d6'}}>
          <MDBIcon style={{float: 'left'}} className='mt-4 ms-1' far icon='calendar-alt' size='lg'/>
          <strong style={{marginLeft: '4px', float: 'left', marginTop: '12px'}}>{post && post.modified}</strong>
          <Badge className='badge'  styleInfo={styleInfo}>{post && post.category}</Badge>
        </div>
        <MDBTypography className='bg-light bg-opacity-25 lead shadow-5 p-4 md-0 mb-3' style={{color: '#757575'}}>
          {post && post.description}
        </MDBTypography>
        {
          (user.username === (post && post.username)) ?
          <div style={{height: '50px'}}>
          <Link to={`/update/${post && post.id}`}><MDBBtn style={{float: 'left', background: '#55acee'}}>
          <MDBIcon fas icon='edit'  size='lg' color='white'/>
          </MDBBtn></Link>
          <MDBBtn style={{float: 'right'}} className='bg-danger' onClick={() => deletePost(post && post.id)}>
          <MDBIcon fas icon='trash' color='white' size='lg'/>
          </MDBBtn>
          </div>  : ''
        }
        
      </div>
      {
        (user.username === (post && post.username)) ?
        <MDBCardFooter className='text-muted text-center'>Author: You <span className='text-capitalize bg-dark bg-opacity-25 text-light rounded-pill px-2'>{post && post.username}</span></MDBCardFooter> :
        <MDBCardFooter className='text-muted text-center'>Author: <span className='text-capitalize'>{post && post.username}</span></MDBCardFooter>
      }
      
      <hr className='text-success fw-bold'/>
      <MDBTypography tag='h4' className='fw-bold text-center'>Related Posts</MDBTypography>
      <MDBRow className='text-align-center mb-3'>
        {dataByCategory && dataByCategory.splice(0,3).map((item, index) => {
          return (
        <MDBCol xl='4' md='6' key={index}>
        <Link to={`/view/${item.id}`} >
         <MDBCard onClick={() => {
           window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
           }}
           alignment='center' className='bg-info bg-opacity-25 mt-5' style={{height: '450px'}}>
           <MDBCardImage src={`http://localhost:5000/${item.file}`} fluid alt={item.file} style={{height: '200px'}}/>
           <MDBCardBody>
             <MDBCardTitle className='text-dark'>{item.title}</MDBCardTitle>
             <MDBCardText className='text-muted'>{(item.description).substring(0, 50)}...</MDBCardText>
           </MDBCardBody>
         </MDBCard>
         </Link>
        </MDBCol>)
        })}
      </MDBRow>
    </MDBContainer>
    </MDBContainer>
  )
}

export default View

