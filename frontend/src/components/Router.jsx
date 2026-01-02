import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chadh from './Chadh'
import Cpvc from './Cpvc'
import Power from './Power'
import Swr from './Swr'
import Category from './Category'
import Cart from './Cart'

const Router = () => {
  return (
     <Routes>
        <Route path="/" element={<Category />} />
         <Route path="/chadh" element={<Chadh />}/>
         <Route path="/cpvc" element={<Cpvc />}/>
         <Route path="/power" element={<Power />}/>
         <Route path="/swr" element={<Swr />}/>
         <Route path="/cart" element={<Cart />}/>
     </Routes>
  ) 
}

export default Router
