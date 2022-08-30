import React from 'react';
import {Link} from 'react-router-dom';
import  "./Landing.css"


export default function Landing(){
    return (
    
        <div id='justificado'>

            <div>
                <h1 className='title'>Dog App</h1>
                <Link to ='/home'>
                    <button className='boton'> Start </button>
                </Link>
            </div>
            <div className="cargando">
                <img src="https://www.animalesextremos.com/Imagenes/beagle-top-de-razas-de-perros.jpg" />
            </div>
        </div>
    )
}