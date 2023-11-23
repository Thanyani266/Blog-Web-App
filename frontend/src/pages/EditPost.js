import React from 'react'
import {MDBInput, MDBTextArea} from 'mdb-react-ui-kit'


const EditPost = () => {
  
  return (
    <div className='mx-5'>
      <form style={{margin: '20%'}}>
        <MDBInput label='Title' id='title' type='text' name='title' className='mb-2'/>
        <MDBTextArea label='Description' id='description' type='text' name='description' rows={4} className='mb-2'/>
        <MDBInput type='submit' value="Update" />    
    </form>
    </div>
  )
}

export default EditPost
