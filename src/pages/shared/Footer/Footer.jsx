import React from 'react';
import Logo from '../../../components/logo/Logo';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaAppStoreIos, FaGooglePlay } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Navigation & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
           <Logo light={true} />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mt-2">
              Fast, reliable, and secure parcel delivery service nationwide. Track your packages in real-time with zero hassle.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-2 max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
                Subscribe for updates
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition"
                />
                <button 
                  className="btn btn-primary bg-emerald-500 hover:bg-emerald-600 border-none text-black px-4 py-2.5 rounded-lg flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold text-base mb-1">Services</span>
            <Link to="/send-parcel" className="text-sm hover:text-emerald-400 transition-colors">Send Parcel</Link>
            <Link to="/coverage" className="text-sm hover:text-emerald-400 transition-colors">Coverage Area</Link>
            <Link to="/pricing" className="text-sm hover:text-emerald-400 transition-colors">Parcel Rates</Link>
            <Link to="/rider" className="text-sm hover:text-emerald-400 transition-colors">Become a Rider</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold text-base mb-1">Company</span>
            <Link to="#" className="text-sm hover:text-emerald-400 transition-colors">About Us</Link>
            <Link to="#" className="text-sm hover:text-emerald-400 transition-colors">Latest News</Link>
            <Link to="#" className="text-sm hover:text-emerald-400 transition-colors">Careers</Link>
            <Link to="#" className="text-sm hover:text-emerald-400 transition-colors">Contact Support</Link>
          </div>

          {/* Download App & Social */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-semibold text-base">Get Our App</span>
            <div className="flex flex-col gap-2.5">
              <button className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-2 rounded-xl transition text-left">
                <FaGooglePlay className="text-emerald-400 text-xl shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase text-gray-400 leading-tight">Get it on</span>
                  <span className="text-xs font-semibold text-white">Google Play</span>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-2 rounded-xl transition text-left">
                <FaAppStoreIos className="text-emerald-400 text-2xl shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase text-gray-400 leading-tight">Download on</span>
                  <span className="text-xs font-semibold text-white">App Store</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} zapShift Logistics Ltd. All rights reserved.</p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-base">
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;