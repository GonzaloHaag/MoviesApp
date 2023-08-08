import React from 'react'
import { NavLink } from 'react-router-dom';

import {AiOutlineMenu} from 'react-icons/ai'


const Navbar = ({setInputSearch}) => {
  //prop que manda app.js

  const navLinkStyle = ({isActive}) => {
    return {
      textDecoration : 'none',
      color : isActive ? 'orange' : 'white', //Si esta active lo quiero orange
      textTransform : 'uppercase' 
    }
  }

  const buscarMovie = (e) => {
    setInputSearch(e.target.value);
  }

 
  return (
    /*Navbar de bootstrap*/
    <nav className="navbar navbar-expand-lg bg-dark p-3">
    <div className="container-fluid">
      <NavLink className="navbar-brand text-uppercase" style={{color:'aqua'}} to="/">MOVIESAPP</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon color-white"><AiOutlineMenu style={{color:'white',marginTop:'5px'}} /></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink style={navLinkStyle} className="nav-link active" aria-current="page" to="/movies">Movies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink style={navLinkStyle} className="nav-link" to="tvShows">TvShows</NavLink>
          </li>
          <li className="nav-item">
            <NavLink style={navLinkStyle} className="nav-link" to='people'>People</NavLink>
          </li>
        </ul>
        <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={buscarMovie} />
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar