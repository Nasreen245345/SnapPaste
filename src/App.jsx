import { useState } from 'react'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Notfound from './components/Notfound';
const router=createBrowserRouter([
  {path:'/',element:<div> <Navbar/><Home/> </div>},
  {path:'/pastes',element:<div> <Navbar/><Paste/> </div>},
  {path:'/pastes/:id',element:<div> <Navbar/><ViewPaste/> </div>},
{path:'*',element:<Notfound/>},])
  
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
