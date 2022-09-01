import React from 'react';
import {Link} from 'react-router-dom';
import  "./Landing.css"

export default function Landing(){
    return (
    
        <div className="completa">

                <Link to ='/home'>
                    <button className='boton'> Start </button>
                </Link>
                
        </div>
    )
}