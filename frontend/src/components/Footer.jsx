import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-4 mt-auto flex justify-center">
     
    <div className='flex flex-col items-center gap-2'>
        {/* Social Icons */}
        <div className="flex gap-4 text-2xl">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="hover:text-blue-500" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="hover:text-pink-500" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="hover:text-blue-400" />
          </a>

        </div>
        <div>
            <p className="text-sm mt-2">&copy; Nestara private limited</p>
        </div>
        <div className=''>
            <a href="https://www.neestara.com" target="_blank" rel="noopener noreferrer" className="text-sm mt-4 hover:underline ">Privacy Terms</a>
        </div>
     </div>
    </footer>
  );
};

export default Footer;
