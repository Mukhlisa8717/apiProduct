import React, { useState, useEffect, useRef } from "react";
import "./Navbar.scss";
import logo from "../../../public/logoDark.png";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { BiSolidLogIn } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import Login from "../login/Login";
import { MdCreateNewFolder } from "react-icons/md";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [loginModel, setLoginModel] = useState(false)
  const userData = JSON.parse(localStorage.getItem("user-data"));
  document.body.style.overflow = loginModel ? "hidden" : "auto";

  const sideNavbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sideNavbarRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    if (menu) {
      document.addEventListener("click", handleClickOutside);
      document.body.classList.add("menu-open");
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("menu-open");
    };
  }, [menu]);

  const handleNavbarClick = () => {
    setMenu(!menu);
  };

  return (
    <>
      <nav className="navbar">
        {userData ? (
          <h2>
            {userData.FirstName} | {userData.role}
          </h2>
        ) : (
          <></>
        )}
      </nav>
      <nav
        className={`side-navbar ${menu ? "menu" : ""}`}
        onClick={handleNavbarClick}
        ref={sideNavbarRef}
      >
        <img src={logo} alt="logo" className="side-navbar__logo" />
        <div className={`side-navbar__menu ${menu ? "open" : ""}`}>
          <NavLink to="/" className="side-navbar__menu-item">
            <FaHome size={18} />
            <h5>Home</h5>
          </NavLink>
          <NavLink to="/create-product" className="side-navbar__menu-item">
            <MdCreateNewFolder size={18} />
            <h5>Create product</h5>
          </NavLink>
          <NavLink to="/profile" className="side-navbar__menu-item">
            <FaUser size={15} />
            <h5>Profile</h5>
          </NavLink>
          {/* {userData?.role === "admin" ? (
            <NavLink to="/users" className="side-navbar__menu-item">
              <FaUsers size={18} />
              <h5>Users</h5>
            </NavLink>
          ) : (
            <></>
          )} */}
          <Link
            to="/"
            className="side-navbar__menu-item"
            onClick={() => {
              setLoginModel(true);
            }}
          >
            <BiSolidLogIn size={18} />
            <h5>Login</h5>
          </Link>
          <Link
            to="/"
            className="side-navbar__menu-item"
            onClick={() => {
              localStorage.clear();
            }}
          >
            <ImExit size={18} />
            <h5>Exit</h5>
          </Link>
        </div>
      </nav>
      {loginModel ? <Login setLoginModel={setLoginModel} /> : <></>}
    </>
  );
};

export default Navbar;
