import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {MDBInput, MDBTextArea} from 'mdb-react-ui-kit'
import {toast} from 'react-toastify'

const initialState = {
    title: "",
    description: ""
}

const EditPost = () => {
  const [state, setState] = useState(initialState);

  const {title, description} = state;
  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
    if(id) {
        getSinglePost(id)
    }
  }, [id])

  const getSinglePost = async (id) => {
    const response = await axios.get(`http://localhost:5000/post/${id}`)
      if (response.status === 200) {
        setState(response.data[0]);
      }
  }

  const updatePost = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/post/${id}`, data)
    if (response.status === 200) {
        toast.success(response.data);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!title || !description) {
        toast.error("Please provide value into each input field")
    }else{
        if(id) {
            updatePost(state, id);
        }
        navigate('/')
    } 
  }
  
  const handleInputChange = (event) => {
    let {name, value} = event.target;
    setState({...state, [name]: value})
  } 
  console.log(state)
  return (
    <div className='mx-5'>
      <form style={{margin: '20%'}} onSubmit={handleSubmit}>
        <MDBInput label='Title' id='title' type='text' name='title' value={title} onChange={handleInputChange} className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} value={description} onChange={handleInputChange} className='mb-2'/>
        <MDBInput type='submit' value="Update" />    
    </form>
    </div>
  )
}

export default EditPost
