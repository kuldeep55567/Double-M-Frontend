import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Don't forget to import useNavigate
import { close, logo, menu } from "../../src/assets";
import { mm, mlogo } from "../assets/index";
import { navLinks } from "../constants/index";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [modifiedNavLinks, setModifiedNavLinks] = useState(navLinks); 
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userID'));
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedId = localStorage.getItem('userID');

    console.log('Stored Name:', storedName);
    console.log('Stored ID:', storedId);
    if (storedName && storedId) {
      setUserName(storedName);
      
      const updatedNavLinks = navLinks.map(link => {
        if (link.title === "Login") {
          return {
            id: `profile/${storedId}`,
            title: storedName.split(' ')[0],
          };
        }
        return link;
      });
      setModifiedNavLinks(updatedNavLinks);
    }
  }, [isLoggedIn]);

  // console.log('UserName:', userName);
  // console.log('Modified Nav Links:', modifiedNavLinks);
  const logout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    setUserName("");
    setIsLoggedIn(false);
    navigate("/"); // Reload the page to reflect the changes
    window.location.reload()
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/"><img src={mlogo} alt="missmarch" className="w-[200px] h-[130px]" /></Link>
  
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {modifiedNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === modifiedNavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
        {userName && (
          <li
            className="font-poppins font-normal cursor-pointer text-red-500 pl-6"
            onClick={logout}
          >
            Logout
          </li>
        )}
      </ul>
  
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
  
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {modifiedNavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
            {userName && (
              <li
                className="font-poppins font-medium cursor-pointer text-red-500 pt-3"
                onClick={logout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
