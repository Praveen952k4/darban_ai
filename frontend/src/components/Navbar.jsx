import React from "react";
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";



const Navbar = () => {
  const user = {
    name: "Praveen",
    photo: "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-dt9lf8um.png", 
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 px-6 py-4 shadow-md">
      <Link to="/" className="text-2xl font-bold text-amber-100 cursor-pointer">
        Blink Tac Toe
      </Link>
      <div className="flex items-center space-x-4">
        <p className="text-amber-50 font-medium">{user.name}</p>
        <FaUserCircle className="text-amber-50 w-10 h-10" />
      </div>
    </nav>
  );
};

export default Navbar;
