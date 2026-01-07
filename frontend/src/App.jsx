import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateList from "./pages/CreateList.jsx";
import Listings from "./pages/Listings.jsx";
import EditList from "./pages/EditList.jsx";
import Layout from "./components/Layout.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path='/signup' element={ <SignUp/> } />
        <Route path='login' element={ <Login/> } />

        <Route element={<Layout />}>
          
          
          <Route path="/create" element={<CreateList />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/edit/:id" element={<EditList />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
