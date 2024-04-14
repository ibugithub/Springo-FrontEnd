"use client";
import React, { useState } from "react";
import "../../styles/navbar.css";
import logoImage from "../../assets/logo.jpg";
import Image from "next/image";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const clickOnAccount = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <div className="left-nav-items">
          <Image src={logoImage} alt="Logo" className="logo-image" />
          <a href="/" className="logo-text">
            Springo
          </a>
        </div>
        <div className="right-nav-items">
          <a href="/stories" className="navbar-item">
            Story
          </a>
          <a href="/uploadStory" className="navbar-item">
            Write
          </a>
          <a
            href="/profile"
            className="navbar-item"
            aria-haspopup="true"
            onClick={clickOnAccount}
          >
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
};
