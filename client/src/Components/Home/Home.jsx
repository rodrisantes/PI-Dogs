import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterByTemperament, filterByCreated, orderByName, orderByWeight, } from "../../Redux/actions.js";
import Paginado from "../Paginado/Paginado.jsx";
import Card from "../Card/Card.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.css"
import Loading from "../../Assets/Loading.gif"


export default function Home() {

  const dispatch = useDispatch();

  var breeds = useSelector((state) => state.dogs);

  const allTemps = useSelector((state) => state.temps);
  const allTemps2 = allTemps.filter(e => e.name.length > 2)

  const [actualPage, setPagActual] = useState(1);
  const lastIndexDog = actualPage * 8;
  const firstIndexDog = lastIndexDog - 8;
  const currentDogs = breeds.slice(firstIndexDog, lastIndexDog);
  
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

      <nav className="nav">

          <select className="select" name="created" onChange={(e) => handleFilterCreated(e)}>
            <option className="options" value="All" >Todas las razas</option>
            <option className="options" value="ApiDog" >Razas Existentes</option>
            <option className="options" value="razaBD" >Razas Creadas</option>
          </select>

          <select className="select" name="abcOrden" onChange={(e) => handleOrderByAlphabet(e)}>
            <option className="options" value="all" >Orden Alfabético</option>
            <option className="options" value="asc" >Ascendente A-Z</option>
            <option className="options" value="desc" >Descendente Z-A</option>
          </select>

          <select className="select" name="orderWeight" onChange={(e) => handleWeight(e)}>
            <option className="options" value="All" >Orden Peso Promedio</option>
            <option className="options" value="min" >Peso Mínimo</option>
            <option className="options" value="max" >Peso Máximo</option>
          </select>

          <select className="select" name="temps" onChange={(event) => handleFilterTemp(event)}>
            <option  value="All">Filtro x Temperamento</option>
            {allTemps2.map((t) => (
              <option className="temps" key= {t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

        <div >
          <Link className="select" to="/">Volver a Inicio</Link>
        </div>

        <div className="NavDer">
          <div>
            <SearchBar />
          </div>

          <div className="select">
            <Link className="link" to="/dog">Crear Nueva Raza</Link>
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
        {currentDogs.length ? (currentDogs.map((el, index) => {
          return (
              
              <Link to ={`/dog/${el.id}`} key={index}
              >
              <button  >
              <Card
                id={el.id}
                name={el.name}
                temperament={el.temperament}
                image={el.image ? el.image : "img not found"}
                weight={el.weight}
                height = {el.height}
                />
                </button>
                </Link>    

          )
        })) : <img className = "Loading" src = {Loading} alt="img not found"/>}
      </div>
      <div >
      <span className="nroPag">  {currentDogs.length? `Pag. ${actualPage}`: ""}</span>
      </div>
    </div>
  );
} 