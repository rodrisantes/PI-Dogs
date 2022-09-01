import React from "react";
import "./Card.css"

export default function  Card({image, name, temperament, weight, height}){
    return (
                <div className="card">  
                    <h3 className="cardTitle">{name}</h3>  
                    <img className="imageCard" src={image} alt= "Insert Dog photo "/>
                    <p className="cardTemperament">Temperament :  { temperament}</p>
                    <p className="cardWeight">Weight: {weight}</p>
                    <p><span className="cardHeight">Height: {height}</span></p>
                
                </div>
    )
}

