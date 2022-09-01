
const initialState = {
  allDogs: [],
  dogs: [],
  temps: [],
  detail: [],
};

function reducer(state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload, 
        dogs: action.payload,
      };

    case "GET_TEMPERAMENT":
      return {
        ...state,
        temps: action.payload,
      };


    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload
      }
     

    case "POST_DOG":
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload]
      }

    case "GET_DOG_DETAIL_ID":
      return{
        ...state,
        detail: action.payload
      }  

    case "FILTER_BY_TEMP":
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


    case "FILTER_BY_CREATED":
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


    case "ORDER_BY_NAME":
      const dogsOr = [...state.dogs];

        action.payload === "asc"
          ? dogsOr.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : dogsOr.sort(function (a, b) {
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


    case "ORDER_BY_WEIGHT":
      var dogsW = [...state.dogs];  
      if (action.payload === 'min') {
        dogsW.sort(function (a, b) {
            let aWeight = parseInt(a.weight.split(' - ')[0]); 
            let bWeight = parseInt(b.weight.split(' - ')[0]); 
   
            if (aWeight < bWeight) return -1
            if (aWeight > bWeight) return 1
            return 0
        });
    }

    if (action.payload === 'max') {
      dogsW.sort(function (a, b) {
            let aWeight = parseInt(a.weight.split(' - ')[0]);
            let bWeight = parseInt(b.weight.split(' - ')[0]);
         

            if (aWeight < bWeight) return 1
            if (aWeight > bWeight) return -1
            return 0
        });
    }


//    

      // for (let i = 0; i < dogsW.length; i++) {
      //   var peso = dogsW[i].weight.split(" - "); 
      //   if (peso[0] && peso[1] && peso[0].trim() === "NaN") peso[0] = peso[1];
      //   if (peso[1] && peso[0] && peso[1].trim() === "NaN") peso[1] = peso[0];

      //   if (dogsW[i].weight === "NaN") {
      //     dogsW[i].pmin = 100;
      //   } else {
      //     dogsW[i].pmin = parseInt(peso[0].trim());
      //   }

      //   if (peso.length > 1) {
      //     dogsW[i].pmax = parseInt(peso[1].trim());
      //   } else {
      //     dogsW[i].pmax = dogsW[i].pmin;
      //   }
      // }

      // if (action.payload === "min") {
      //   dogsW.sort(function (a, b) {
      //     return (a.pmin + a.pmax) / 2 - (b.pmin + b.pmax) / 2; 
      //   });
      // } else if (action.payload === "max") {
      //   dogsW.sort(function (a, b) {
      //     return (b.pmin + b.pmax) / 2 - (a.pmin + a.pmax) / 2; 
      //   });
      // }
      return {
        ...state,
        dogs: dogsW,
      };

      
    default:
      return state;
  }


}




export default reducer;
