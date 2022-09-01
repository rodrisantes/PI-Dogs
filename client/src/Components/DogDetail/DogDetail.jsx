import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../Redux/actions";
import { Link } from "react-router-dom";

import "./DogDetail.css"


export default function DogDetail() {
    const {id} = useParams()
    const aDog = useSelector(state => state.detail)


    const dispatch = useDispatch();
    useEffect(() => {
         dispatch(getDogDetail(id));  
    },[])

    useEffect(() => {
        console.log(aDog)
    }, [aDog])

    // function renderDog() {

    //     if (id.length < 10) {
    //         return (
    //             <div className="background">
    //                 <div className="contenedor">
    //                     <p className="text">{aDog?.name}</p>
    //                     <img src={aDog?.image} className="image" alt="Not found"/>
    //                     <p className="text2">Height : {aDog?.height}</p>
    //                     <p className="text2">Weight: {aDog?.weight}</p>
    //                     <p className="text2">Life span: {aDog?.life_span}</p>
    //                     <p className="text2">Temperament: {aDog?.temperament}</p>
    //                     <Link className="link" to="/home">Home</Link>

    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         console.log(aDog)
    //         const tTemperaments = aDog.temperaments.map(e => e.name)
    //         console.log(tTemperaments, "holaaaaa")
        
    //         return (
    //             <div className="background">
    //                 <div className="contenedor">
    //                     <p className="text">{aDog?.name}</p>
    //                     <p className="text2">{aDog[0]?.height}</p>
    //                     <p className="text2">{aDog[0]?.weight}</p>
    //                     <p className="text2">{aDog[0]?.life_span}</p>
    //                     <p className="text2">{tTemperaments}</p>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
    
    return (
      <div>
        {id.length < 10 ? (

        <div className="background">
        <div className="contenedor">
            <p className="text">{aDog?.name}</p>
            <img src={aDog?.image} className="image" alt="Not found"/>
            <p className="text2">Height : {aDog?.height}</p>
            <p className="text2">Weight: {aDog?.weight}</p>
            <p className="text2">Life span: {aDog?.life_span}</p>
            <p className="text2">Temperament: {aDog?.temperament}</p>
            <Link className="link" to="/home">Home</Link>

        </div>
    </div>


        ): (


            <div className="background">
            <div className="contenedor">
                <p className="text">{aDog?.name}</p>
                <img src={aDog?.image} className="image" alt="Not found"/>
                <p className="text2">Height : {aDog?.height}</p>
                <p className="text2">Weight: {aDog?.weight}</p>
                <p className="text2">Life span: {aDog?.life_span}</p>
                {aDog?.temperaments?.map(e => <p> {e.name} </p>)}
                {/* <p className="text2">Temperament: {aDog?.temperaments.name.map(e => <p> {e.name}</p> ) }</p> */}
                <Link className="link" to="/home">Home</Link>
    
            </div>
        </div>

        )}
    {console.log(aDog?.temperaments)}
    </div>
        // <div>
        // {typeof aDog.name?
        //  <h1>Loading...</h1>
        // : renderDog(aDog)
        // }
        // </div>
    )
    
}


module.export = DogDetail;