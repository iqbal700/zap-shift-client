import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo.png';

const Logo = ({ light = false }) => {
  return (
    <Link to="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
      <img 
        src={logo} 
        alt="zapShift Logo" 
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
      />
      <span className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${light ? 'text-white' : 'text-base-content'}`}>
        zap<span className="text-primary">Shift</span>
      </span>
    </Link>
  );
};

export default Logo;