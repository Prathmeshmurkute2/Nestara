import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateList from "./pages/CreateList.jsx";
import Listings from "./pages/Listings.jsx";
import EditList from "./pages/EditList.jsx";
import Layout from "./components/Layout.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
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
