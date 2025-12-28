import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons'; // far icons

const Navbar = () => {
  return (
    <div className='w-full h-12 bg-white shadow-sm flex items-center px-2'>
      <div className='text-red-600 font-bold text-xl'>
      <FontAwesomeIcon icon={faCompass} className="mr-4" />
      </div>
      <div className='flex gap-6'>
        <h4>Home</h4>
        <h4>All Listings</h4>
        <h4>Add New Listing</h4>
      </div>
    </div>
  );
};

export default Navbar;
