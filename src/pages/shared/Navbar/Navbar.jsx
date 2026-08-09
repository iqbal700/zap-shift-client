import React from 'react';
import Logo from '../../../components/logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

  const {user, logoutUser} = useAuth();

  const handleLogout = () => {
      logoutUser()
       .then(res => console.log(res))
        .catch(err => console.log(err))
  }

    const links =
       <>
            <li> <NavLink to={"/"}> Home </NavLink> </li>
            <li> <NavLink to={'/coverage'}> Coverage </NavLink> </li>
            <li> <NavLink to={'/send-parcel'}> Send Parcel </NavLink> </li>
            <li> <NavLink to={'/rider'}> Be a Rider </NavLink> </li>
              <li> <NavLink to={'/about'}> About us </NavLink> </li>

            {
              user &&
               <>
                <li> <NavLink to={'/dashboard/my-parcels'}> My Parcels </NavLink> </li>
                <li> <NavLink to={'/dashboard'}> Dashboard </NavLink> </li>
               </>
            }
           
       </>

    return (
        <div className='sticky z-100 top-0'>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className='ml-1.5'>
        <Logo></Logo>
    </div>
        
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {links}
    </ul>
  </div>
  <div className="navbar-end">
     {
      user ? 
             <a onClick={handleLogout} className="btn">Logout</a>
            :  <Link className='btn' to='/login'>Login</Link>
     }
     <Link className='btn btn-primary text-black' to='/rider'>Be a rider</Link> 
  </div>
</div>
        </div>
    );
};

export default Navbar;