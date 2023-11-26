import React, {useContext, useState} from 'react'
import axios from 'axios'
import {MDBInput, MDBContainer, MDBTypography, MDBBtn, MDBTextArea} from 'mdb-react-ui-kit'
import {toast} from 'react-toastify'
import { userContext } from '../App'

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech']

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  const [category, setCategory] = useState('')
  const user = useContext(userContext)

  const addPost = async (data) => {
    const response = await axios.post('http://localhost:5000/post', data)
    if (response.status === 200) {
        toast.success(response.data);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', user.username);
    formData.append('file', file);
    formData.append('category', category);
    
    if (!title || !description || !file || !category) {
        toast.error("Please provide value into each input field")
    }else{
        addPost(formData);
        window.location.href = '/'
    } 
  }
  
  return (
    <MDBContainer style={{backgroundColor: '#ECEFF1'}} fluid className='py-5'>
      <MDBContainer style={{maxWidth: '900px'}} className='bg-light bg-opacity-50 border rounded-5 p-5'>
      <MDBTypography tag='h4' className='fw-bolder text-muted text-center mb-5'>New Blog Post</MDBTypography>
      <form onSubmit={handleSubmit}>
        <MDBInput label='Title' id='title' type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)} className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className='mb-2'/>
        <MDBInput id='file' type='file' onChange={(event) => setFile(event.target.files[0])} className='mb-2'/>
        <select className='form-select mb-2' value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>Please Select Category</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <MDBBtn color='secondary' type='submit' className='w-100 btn-sec text-dark'>Add Post</MDBBtn>
    </form>
    </MDBContainer>
    </MDBContainer>
  )
}

export default AddPost
