import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterByTemperament, filterByCreated, orderByName, orderByWeight, } from "../../Redux/actions.js";
import Paginado from "../Paginado/Paginado.jsx";
import Card from "../Card/Card.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Styles from "./Home.css"
import DogDetail from "../DogDetail/DogDetail.jsx";


export default function Home() {

  const dispatch = useDispatch();

  var breeds = useSelector((state) => state.dogs);

  const allTemps = useSelector((state) => state.temps);
  const allTemps2 = allTemps.filter(e => e.name.length > 2)

  const [actualPage, setPagActual] = useState(1);
  const lastIndexDog = actualPage * 8;
  const firstIndexDog = lastIndexDog - 8;
  const currentDogs = breeds.slice(firstIndexDog, lastIndexDog);
  const allIds = useSelector((state) => state.detail)
  
  const idMaps = allIds.map(e => e.id)


  const paginado = (pageNumber) => {
    setPagActual(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleFilterTemp(e) {
    dispatch(filterByTemperament(e.target.value));
    setPagActual(1);
  }

    function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));
    setPagActual(1);
  }

 
  function handleOrderByAlphabet(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPagActual(1);
  }

  function handleWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPagActual(1);
  }

 




  return (
    <div className="divgral">

      {/* el Nav */}
      <nav className="nav">
        <div className="navIzq">

          <select className="select" name="created" onChange={(e) => handleFilterCreated(e)}>
            <option className="options" value="All" key="3">Todas las razas</option>
            <option className="options" value="ApiDog" key="4">Razas Existentes</option>
            <option className="options" value="razaBD" key="5">Razas Creadas</option>
          </select>

          <select className="select" name="abcOrden" onChange={(e) => handleOrderByAlphabet(e)}>
            <option className="options" value="all" key="0">Orden Alfabético</option>
            <option className="options" value="asc" key="1">Ascendente A-Z</option>
            <option className="options" value="desc" key="2">Descendente Z-A</option>
          </select>

          <select className="select" name="orderWeight" onChange={(e) => handleWeight(e)}>
            <option className="options" value="All">Orden Peso Promedio</option>
            <option className="options" value="min">Menor Peso Promedio</option>
            <option className="options" value="max">Mayor Peso Promedio</option>
          </select>

          <select className="select" name="temps" onChange={(event) => handleFilterTemp(event)}>
            <option  value="All" key={100}>Filtro x Temperamento</option>
            {allTemps2.map((t) => (
              <option className="temps" key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div >
          <NavLink className="select" to="/">Volver a Inicio</NavLink>
        </div>

        <div className="NavDer">
          <div>
            <SearchBar />
          </div>

          <div className="select">
            <NavLink className="link" to="/dog">Crear Nueva Raza</NavLink>
          </div>

        </div>
      </nav>


      <div >
        <Paginado
          allDogs={breeds.length}
          paginado={paginado}
        />

      </div>

      <div className="cards">
        {currentDogs?.map((el) => {
          return (
            <div>
              
              <Link to ={`/dog/${el.id}`} >
              <button  >
              <Card
                id={el.id}
                name={el.name}
                temperament={el.temperament}
                image={el.image ? el.image : "imagen no encontrada"}
                weight={el.weight}
                />
                </button>
                </Link>    

            </div>
          );
        })}
      </div>

      <span className="nroPag"> Pag. {actualPage}</span>

    </div>
  );
} 