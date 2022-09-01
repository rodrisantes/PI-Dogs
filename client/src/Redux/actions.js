import axios from "axios";


export function getDogs() { 
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs"); 

      return dispatch({
        type: "GET_DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log("Breeds not found", error);
    }
  };
}

export function getTemperaments() { 
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET_TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log("Temperaments not found", error);
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      
        return dispatch({
          type: "GET_NAME_DOGS",
          payload: json.data,
        });
    
    } catch (error) {
      console.log("Name not found", error);

    }
  };
}

export function postDog(payload){ 
  
  return async function (dispatch) {
      
      var json = await axios.post("http://localhost:3001/dog", payload); 
      return dispatch({
        type: "POST_DOG",
        payload: json.data,
      });
  };

}

export function getDogDetail(id){
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);

      return dispatch({
        type: "GET_DOG_DETAIL_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log("Breed detail not found", error);
    }
  };
}


export function filterByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}


export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}


export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}


export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
