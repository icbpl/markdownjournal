
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-academic-500 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-serif font-semibold">ScholarHub</h2>
              <p className="text-xs text-academic-200 mt-[-2px]">Academic Journal Aggregator</p>
            </Link>
            <p className="text-academic-100 text-sm mt-4 max-w-xs">
              A comprehensive platform for academic journals, research papers, and scholarly articles across multiple disciplines.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/journals/engineering" className="text-academic-100 hover:text-white transition-colors">Engineering</Link></li>
              <li><Link to="/journals/medicine" className="text-academic-100 hover:text-white transition-colors">Medicine</Link></li>
              <li><Link to="/journals/computer-science" className="text-academic-100 hover:text-white transition-colors">Computer Science</Link></li>
              <li><Link to="/journals/biology" className="text-academic-100 hover:text-white transition-colors">Biology</Link></li>
              <li><Link to="/journals/physics" className="text-academic-100 hover:text-white transition-colors">Physics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-academic-100 hover:text-white transition-colors">Search</Link></li>
              <li><a href="#" className="text-academic-100 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-academic-100 hover:text-white transition-colors">Publication Guidelines</a></li>
              <li><a href="#" className="text-academic-100 hover:text-white transition-colors">Citation Standards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-academic-100 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-academic-100 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@scholarhub.example.com" className="text-academic-100 hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-academic-100 text-sm">
              Subscribe to our newsletter for updates on the latest research and publications.
            </p>
            <form className="mt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-academic-900 bg-white rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-academic-300"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-academic-400 px-3 py-2 rounded-r-md text-white font-medium hover:bg-academic-300 transition-colors focus:outline-none focus:ring-1 focus:ring-academic-300"
                  aria-label="Subscribe"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <hr className="border-academic-400 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-academic-200">
          <p>© {year} ScholarHub. All rights reserved.</p>
          <div className="flex flex-wrap space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
