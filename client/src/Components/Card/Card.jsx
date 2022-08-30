import React from "react";
import "./Card.css"

export default function  Card({image, name, temperament, weight, height}){
    return (
        <div className='paginado2'>
            <div>
                <div className="card">  
                    <h3 className="title3">{name}</h3>  
                    <img className="imageCard" src={image} alt= "Dog picture"/>
                    <p className="base11">Temperament :  { temperament}</p>
                    <p className="base2">Weight: {weight}</p>
                    <p><span className="base3">Height: {height}</span></p>
                
                </div>
            </div>
        </div> 
    )
}

