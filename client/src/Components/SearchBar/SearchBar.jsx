import { React, useState} from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../Redux/actions";
import "./SearchBar.css"

export default function SearchBar() { 

  const dispatch = useDispatch();
  const [name, setName] = useState(""); 

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(name));
    setName("");
  }
return (
  <form className="formul" onSubmit={(e) => handleSubmit(e)}>
    <input
      className="input"  type="text"
      placeholder=" Search Dog..."
      value={name}
      onChange={(e) => handleInputChange(e)}
    />
    <input className="boton1" type="submit" value="Buscar" />
  </form>
);
}