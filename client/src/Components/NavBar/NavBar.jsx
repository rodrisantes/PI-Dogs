import React from 'react';
import { Link } from "react-router-dom";
import Order from '../Order/Order';

import SearchBar from '../SearchBar/SearchBar';

import "./NavBar.css"


export default function NavBar(){

  return(<div>
      
  <div className="navbar">
            <div>
            <Link to = "/home">
                <button className="botonHome">Home</button>
            </Link>
            </div>
            <div>
            <Link to = "/dog"> 
                <button className="botonCreate">Create a dog</button>
            </Link>
            </div>
      <div>
        <SearchBar/>
      </div>
      </div> 
  </div>
  )
}