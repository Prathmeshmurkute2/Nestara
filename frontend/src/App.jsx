import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import CreateList from './pages/CreateList.jsx'
import Listings from './pages/Listings.jsx'
import EditList from './pages/EditList.jsx'

const App = () => {
  return (
    
      <Routes>
        <Route path="/create" element={<CreateList />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/edit/:id" element={<EditList />} />
      </Routes>
    
  )
}

export default App
