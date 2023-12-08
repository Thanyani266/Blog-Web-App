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
  MDBCardFooter,
  MDBInput
} from 'mdb-react-ui-kit';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';
import { userContext } from '../App';
import moment from 'moment';

const View = () => {
  const [post, setPost] = useState(null);
  const [data, setData] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
  const user = useContext(userContext)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState({})
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  useEffect(() => {
    if(id) {
        getSinglePost(id)
    }
  }, [id])

  useEffect(() => {
    getPosts();
  }, [])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/comments?post_id=${id}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchComments();
  }, [id])

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

  const addComment = async (data) => {
    const response = await axios.post(`http://localhost:5000/comment?post_id=${id}`, data)
    if (response.status === 200) {
        toast.success(response.data);
    }
  }

  console.log(comments);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const commentData = new FormData();
    commentData.append('comment', comment);
    commentData.append('username', user.username);

    const val = {
      comment: commentData.get('comment'),
      username: commentData.get('username')
    }
    console.log(val);
    
    if (!comment) {
        toast.error("Please provide value into each input field")
    }else{
        addComment(val);
        window.location.reload()
    } 
  }

  return (
    <MDBContainer style={{backgroundColor: '#ECEFF1', paddingTop: '8%', paddingBottom: '8%'}} fluid>
      <MDBRow>
        <MDBCol md='8'>
    <MDBContainer className='mx-auto mb-5 ps-5'>
      <Link to='/' ><strong className='btn btn-outline-dark'><MDBIcon far icon="caret-square-left" className='me-1'/>Go Back</strong></Link>
      <MDBTypography tag='h2' className='text-muted text-center mt-2'>{post && post.title}</MDBTypography>
      <img src={`http://localhost:5000/${post && post.file}`} 
      fluid='true' className='rounded' 
      alt={post && post.file} style={{width: '100%', maxHeight: '400px'}}/>
      <div style={{marginTop: '20px'}} className='mb-2'>
        <div className='band align-items-center mb-3' style={{height: '43px', background: '#d6d6d6'}}>
          <MDBIcon style={{float: 'left'}} className='mt-4 ms-1' far icon='calendar-alt' size='lg'/>
          <strong style={{marginLeft: '4px', float: 'left', marginTop: '12px'}}>{moment(post && post.modified).format('MMMM Do YYYY, h:mm:ss a')}</strong>
          <Badge className='badge'  styleInfo={styleInfo}>{post && post.category}</Badge>
        </div>
        <MDBTypography className='bg-light bg-opacity-25 lead shadow-5 p-4 md-0 mb-3' style={{color: '#757575'}}>
        <div dangerouslySetInnerHTML={{__html: post && post.description}} />
        </MDBTypography>
        {
          (user.username === (post && post.username)) ?
          <div style={{height: '50px'}}>
          <Link to={`/update?edit=${post && post.id}`} state={post}><MDBBtn style={{float: 'left', background: '#55acee'}}>
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
        <MDBCardFooter className='text-muted text-center'>Author: You <span className='text-capitalize'>({post && post.username})</span></MDBCardFooter> :
        <MDBCardFooter className='text-muted text-center'>Author: <span className='text-capitalize'>{post && post.username}</span></MDBCardFooter>
      }
      
      <hr className='text-success fw-bold'/>
      <MDBCardText>
              <MDBBtn onClick={handleClick} outline color='info' className='btn-sec btn-white'>Comments ({comments ? comments.length : 0})<MDBIcon fas icon="angle-double-down" /></MDBBtn>
          </MDBCardText>
              {/* 👇️ show elements on click */}
      {user.username ? isShown && (
        <div className='bg-light bg-opacity-50 mt-2 mb-3'>
          <form onSubmit={handleSubmitComment}>
        <MDBInput label='Enter new comment' id='comment' type='text' name='comment' value={comment} onChange={(event) => setComment(event.target.value)} className='mb-2'/>
        
        <MDBBtn color='dark' outline type='submit' className='w-100 btn-sec text-dark'><MDBIcon far icon="plus-square" className='me-1'/>Add Comment</MDBBtn>    
    </form>
        </div>
      ) : ""}
      {/* 👇️ show component on click */}
    {isShown && comments?.map((item, index) => {
        return (
          <MDBCard key={index} style={{backgroundColor: '#F9FBE7'}} className="mb-2">
            <MDBCardBody className='bg-opacity-25'>
              <MDBTypography tag='p'><MDBIcon fas icon="user-alt" /><span className="text-capitalize ms-1">{item.username}</span><span className="text-muted float-end"><MDBIcon far icon="clock" className='me-1'/>{moment(item.date).fromNow()}</span></MDBTypography>
              <MDBCardBody className="bg-success mb-2 bg-opacity-25">
              <MDBCardText className='text-dark fw-bold'>{item.comment}</MDBCardText>
              </MDBCardBody>
            </MDBCardBody>
          </MDBCard>)
      })}
      
    </MDBContainer>
    </MDBCol>
    <div className="vr vr-blurry" style={{ height: '900px' }}></div>
    <MDBCol md='3'>
    <MDBContainer>
    <MDBTypography tag='h4' className='fw-bold text-center bg-info text-light'>Related Posts</MDBTypography>
      <MDBRow className='text-align-center mb-3'>
        {dataByCategory && dataByCategory.splice(0,2).map((item, index) => {
          return (
        <MDBCol md='12' key={index}>
        <Link to={`/view/${item.id}`} >
         <MDBCard onClick={() => {
           window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
           }}
           alignment='center' className='bg-info bg-opacity-25 mt-5' style={{maxHeight: '450px'}}>
           <MDBCardImage src={`http://localhost:5000/${item.file}`} fluid alt={item.file} style={{maxHeight: '150px'}}/>
           <MDBCardBody>
             <MDBCardTitle className='text-dark'>{item.title}</MDBCardTitle>
             <MDBCardText className='text-muted'><span className='blog-desc' dangerouslySetInnerHTML={{__html: item.description}} /></MDBCardText>
           </MDBCardBody>
         </MDBCard>
         </Link>
        </MDBCol>)
        })}
      </MDBRow>
    </MDBContainer>
    </MDBCol>
    </MDBRow>
    </MDBContainer>
  )
}

export default View

