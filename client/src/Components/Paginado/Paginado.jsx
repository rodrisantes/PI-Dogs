import React from "react";
import "./Paginado.css"

//Componente que renderiza los Nros de paginas para navegar
export default function Paginado({ allDogs, paginado}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / 8); i++) {
    pageNumbers.push(i); 
  
  }
  return (
    <div >
       <ul className="ul"> 
          {pageNumbers.map(n => (  
            <li  className="li" key={n}> 
              <a className="a"  onClick={() => paginado(n)}> {n} </a>         
            </li> 
          ))}
        
       </ul> 
       
    </div>
  );
}