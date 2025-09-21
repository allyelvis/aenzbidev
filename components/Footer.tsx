import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Aenzbidev</h3>
            <p className="text-gray-400">The Cloud Platform for Frontend Developers.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-white">Documentation</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">&copy; {currentYear} Aenzbidev, Inc. All rights reserved.</p>
          {/* Add social media icons here if needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;