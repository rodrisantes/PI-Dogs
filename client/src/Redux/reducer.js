

const initialState = {
  allDogs: [],
  dogs: [],
  temps: [],
  detail: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET-DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, 
      };

    case "GET-TEMPERAMENT":
      return {
        ...state,
        temps: action.payload,
      };


    case "GET-NAME-DOGS":
      return {
        ...state,
        dogs: action.payload
      }
     

    case "POST-DOG":
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload]
      }

    case "GET-DOG-DETAIL-ID":
      return{
        ...state,
        detail: action.payload
      }  

    case "FILTER-BY-TEMP":
      var dogsF = state.allDogs; 
      var tempFilter = [];

      if (action.payload === "All") {
        tempFilter = dogsF;
      } else {
        for (let i = 0; i < dogsF.length; i++) {
          if (dogsF[i].temperament) {
            var temp = dogsF[i].temperament;
            if (temp.includes(action.payload)) {
              tempFilter.push(dogsF[i]);
            }
          }
        }
      }
      return {
        ...state,
        dogs: tempFilter, 
      };


    case "FILTER-BY-CREATED":
      const dogsC = state.allDogs;
      var createdFilter = [];

      if (action.payload === "All") { 
        createdFilter = dogsC;

      } else if (action.payload === "razaBD") { 
       
        dogsC.forEach((el) => {
          if (el.hasOwnProperty("createdInDb")) {
            createdFilter.push(el);
          }
        });

      } else {                               
        dogsC.forEach((el) => {
          if (!el.hasOwnProperty("createdInDb")) {
            createdFilter.push(el);
          }
        });
      }
      console.log(createdFilter)
      return {
        ...state,
        dogs: createdFilter,
      };


    case "ORDER-BY-NAME":
      const dogsOr = [...state.dogs];

      // var ordedDogs =
        action.payload === "asc"
          ? dogsOr.sort(function (a, b) {
            //asc
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : dogsOr.sort(function (a, b) {
              //desc
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: dogsOr,
      };


    case "ORDER-BY-WEIGHT":
      var dogsW = [...state.dogs];

      for (let i = 0; i < dogsW.length; i++) {
        var peso = dogsW[i].weight.split(" - "); //array
        if (peso[0] && peso[1] && peso[0].trim() === "NaN") peso[0] = peso[1];
        if (peso[1] && peso[0] && peso[1].trim() === "NaN") peso[1] = peso[0];

        if (dogsW[i].weight === "NaN") {
          //p/setar el pmnin y q me ponga el NaN al final
          dogsW[i].pmin = 100;
        } else {
          dogsW[i].pmin = parseInt(peso[0].trim());
        }

        if (peso.length > 1) {
          //p/setear el pmax
          dogsW[i].pmax = parseInt(peso[1].trim());
        } else {
          dogsW[i].pmax = dogsW[i].pmin;
        }
      }

      if (action.payload === "min") {
        dogsW.sort(function (a, b) {
          //return a.pmin - b.pmin; //por menor del peso min
          return (a.pmin + a.pmax) / 2 - (b.pmin + b.pmax) / 2; //xpromedio
        });
      } else if (action.payload === "max") {
        dogsW.sort(function (a, b) {
          //return b.pmax - a.pmax;//por mayor del peso max
          return (b.pmin + b.pmax) / 2 - (a.pmin + a.pmax) / 2; //por promedio
        });
      }
      return {
        ...state,
        dogs: dogsW,
      };

      
    default:
      return state;
  }
}

export default reducer;
