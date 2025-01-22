import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import NavBar from './components/NavBar'
import Home from './components/Home'
import PostDetail from './components/PostDetail'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import UserBlog from './components/UserBlog'
import PrivateRoute from './components/ProtectedRoutes'
import Profile from './components/Profile'
import { useContext } from 'react'
import ScrollToTop from './components/ScrollToTop'
import { UserContext } from './context/UserContext'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import SearchResult from './components/searchResult'

const App = () => {
  const {user}= useContext(UserContext)
  
  return (
<>
<ScrollToTop/>
<NavBar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/login' element={!user?<Login/>:<Profile/>}/>
      <Route path='/profile/:id' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route path='/register' element={!user?<Register/>:<Profile/>}/>
      <Route path='/post/:id' element={<PostDetail/>}/>
      <Route path='/create' element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
      <Route path='/edit/:id' element={<PrivateRoute><EditPost/></PrivateRoute>}/>
      <Route path='/search' element={<SearchResult/>}/>
      <Route path='/my-blog/:id' element={<PrivateRoute><UserBlog/></PrivateRoute>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
