import React from 'react';
import Logo from '../../../components/logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li><NavLink to={"/"}>Home</NavLink></li>
      <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
      <li><NavLink to={'/send-parcel'}>Send Parcel</NavLink></li>
      <li><NavLink to={'/pricing'}>Pricing</NavLink></li>
      <li><NavLink to={'/rider'}>Be a Rider</NavLink></li>

      {user && (
        <>
          <li><NavLink to={'/dashboard/my-parcels'}>My Parcels</NavLink></li>
          <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-sm px-2 sm:px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="ml-1.5">
            <Logo />
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm sm:btn-md">
              Logout
            </button>
          ) : (
            <Link
              className="btn btn-sm sm:btn-md bg-[#C5E86C] hover:bg-[#b8de5b] text-[#0B3B36] border-none font-bold inline-flex items-center gap-1"
              to="/login"
            >
              Login
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            className="btn btn-primary text-black btn-sm sm:btn-md hidden sm:inline-flex"
            to="/rider"
          >
            Be a rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;