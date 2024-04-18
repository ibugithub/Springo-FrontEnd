"use client";
import React, { useEffect, useState } from "react";
import "../../styles/navbar.css";
import logoImage from "../../assets/logo.jpg";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/features/auth/authSlice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token =  localStorage.getItem("access_token");
    if(token) {
        dispatch(login())
    }
  }, [dispatch]);

  const handleNavigationClick = () => {
    setIsLoading(true);
  }

  if (isLoading) {
    return <div className="flex justify-center"><span className="mt-2">Loading...</span></div>
  }

  return (
    <nav className="navbar bg-white">
      <div className="navbar-items">
        <div className="left-nav-items">
          <Image src={logoImage} alt="Logo" className="logo-image" />
          <a href="/" className="logo-text" onClick={handleNavigationClick}>
            Springo
          </a>
        </div>
        <div className="right-nav-items">
          <a
            href="/stories"
            className="navbar-item"
            onClick={handleNavigationClick}
          >
            Story
          </a>

          <a
            href="/checklist"
            className="navbar-item"
            onClick={handleNavigationClick}
          >
            CheckList
          </a>

          <a
            href="/audience"
            className="navbar-item"
            onClick={handleNavigationClick}
          >
            Audience
          </a>

          <a
            href="/about"
            className="navbar-item"
            onClick={handleNavigationClick}
          >
            About
          </a>

          {isAuthenticated ? (
            <>
              <a
                href="/profile"
                className="navbar-item"
                aria-haspopup="true"
                onClick={handleNavigationClick} 
              >
                Profile
              </a>
            </>
          ) : (
            <a
              href="/signin"
              className="navbar-item"
              aria-haspopup="true"
              onClick={handleNavigationClick}
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
