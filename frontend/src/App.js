import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import View from './pages/View'
import About from './pages/About'
import NotFound from './pages/NotFound'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register';
import Login from './pages/Login';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

export const userContext = createContext()

const App = () => {
  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/user', {withCredentials: true})
    .then(res => {
      setUser(res.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
      <Header />    
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add' element={<AddPost />}></Route>
        <Route path='/update' element={<EditPost />}></Route>
        <Route path='/view/:id' element={<View />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
