import React from 'react'
import {MDBInput, MDBTextArea} from 'mdb-react-ui-kit'

const options = ['Tech', 'Food', 'Sports']

const AddPost = () => {
  
  return (
    <div className='mx-5'>
      <form style={{margin: '15% 20%'}}>
        <MDBInput label='Title' id='title' type='text' name='title' className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} className='mb-2'/>
        <MDBInput id='file' type='file' className='mb-2'/>
        <select className='form-select mb-2' >
          <option>Please Select Category</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>))}
        </select>
        <MDBInput type='submit' value="Add" />    
    </form>
    </div>
  )
}

export default AddPost
