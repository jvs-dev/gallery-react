import React from 'react'
import './Header.css'
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
        <NavLink to={'/'}><h1>GALLERY</h1></NavLink>
        <NavLink to={'/add'}><button  type='button'><i class="bi bi-plus-circle"></i></button></NavLink>
    </header>
  )
}

export default Header
