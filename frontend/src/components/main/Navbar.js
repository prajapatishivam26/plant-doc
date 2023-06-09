import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../../context/UserProvider'

const Navbar = () => {

  const {loggedIn, logout} = useUserContext();

  

  return (
    <div><>
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-dark"  style={{ backgroundColor: '#358f66' }}>

      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="/images/flg_logo5147-removebg-preview.png"
              height={50}
              alt="PlantDoc Logo"
              loading="lazy"
            />
          </a>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/aboutus">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/contactus">
                Contact us 
              </NavLink>
              </li>
           
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className="d-flex align-items-center">
          {
            loggedIn && (
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="/user/userprofile"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height={25}
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <NavLink className="dropdown-item" to="/user/UserProfile">
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/user/history">
                  My Predictions
                </NavLink>
              </li>
              <li>
              <a role='button' className="dropdown-item" href="#" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
            )
          }
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
    {/* Navbar */}
  </>
  </div>
  )
}

export default Navbar;