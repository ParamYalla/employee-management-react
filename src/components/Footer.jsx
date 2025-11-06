import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
     <footer className="bg-gray-600 text-gray-200 py-6 mt-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        {/* Left - Brand or Logo */}
        <div className="text-lg font-semibold mb-4 md:mb-0">
          © {new Date().getFullYear()} Employee
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to={'/about'} className="hover:text-red-600 transition">About</Link>
          <Link to={'/welcome'} className="hover:text-white transition">Menu</Link>
          <Link to={'/contact'} className="hover:text-white transition">Contact</Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-4">
          <Link to="" className="hover:text-white transition">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="" className="hover:text-white transition">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="" className="hover:text-white transition">
            <i className="fab fa-twitter"></i>
          </Link>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
