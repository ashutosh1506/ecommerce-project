import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearchIcon(true);
    } else {
      setShowSearchIcon(false);
    }
  }, [location]);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-36" />
      </Link>
      {/* Links Section  */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-gray-500"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 hover:text-gray-500"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-gray-500"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 hover:text-gray-500"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right section  */}
      <div className="flex items-center gap-6">
        {showSearchIcon && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            alt=""
            className="w-5 cursor-pointer  transition-transform duration-300 hover:scale-110"
          />
        )}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer  transition-transform duration-300 hover:scale-110"
          />
          {/* Dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link
          to="/cart"
          className="relative transition-transform duration-300 hover:scale-110"
        >
          <img
            src={assets.cart_icon}
            alt=""
            className="w-5 min-w-5 cursor-pointer "
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden transition-transform duration-300 hover:scale-110 "
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`
            absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? "w-full" : "w-0"
            }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
