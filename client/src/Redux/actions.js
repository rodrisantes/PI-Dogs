import axios from "axios";


export function getDogs() { 
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs"); 

      return dispatch({
        type: "GET-DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudieron obtener las razas", error);
    }
  };
}

export function getTemperaments() { 
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET-TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudieron obtener los temperamentos", error);
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      
        return dispatch({
          type: "GET-NAME-DOGS",
          payload: json.data,
        });
    
    } catch (error) {
      console.log("No se pudo obtener la query", error);

    }
  };
}

export function postDog(payload){ 
  
  return async function (dispatch) {
      
      var json = await axios.post("http://localhost:3001/dog", payload); 
      return dispatch({
        type: "POST-DOG",
        payload: json.data,
      });
  };

}

export function getDogDetail(id){
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);

      return dispatch({
        type: "GET-DOG-DETAIL-ID",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudo obtener datos de la raza", error);
    }
  };
}


export function filterByTemperament(payload) {
  return {
    type: "FILTER-BY-TEMP",
    payload,
  };
}


export function filterByCreated(payload) {
  return {
    type: "FILTER-BY-CREATED",
    payload,
  };
}


export function orderByName(payload) {
  return {
    type: "ORDER-BY-NAME",
    payload,
  };
}


export function orderByWeight(payload) {
  return {
    type: "ORDER-BY-WEIGHT",
    payload,
  };
}
