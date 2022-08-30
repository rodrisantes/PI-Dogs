import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../Redux/actions";

import "./DogDetail.css"


export default function DogDetail() {
    const {id} = useParams()
    const aDog = useSelector(state => state.detail)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDogDetail(id));
    },
    [])

    function renderDog(dog) {

        if (id.length < 10) {
            return (
                <div className="background">
                    <div className="contenedor">
                        <p className="text">{aDog?.name}</p>
                        <img src={aDog?.image} className="image" alt="Not found"/>
                        <p className="text2">{aDog?.height?.metric}</p>
                        <p className="text2">{aDog?.weight?.metric}</p>
                        <p className="text2">{aDog?.life_span}</p>
                        <p className="text2">{aDog?.temperament}</p>
                    </div>
                </div>
            )
        } else {
            if (!aDog.id) {
                <h1>Loading...</h1>
            }
            aDog?.forEach((e) =>{
                e.temperament= ""
                for(let i = 0; i<e.temperaments.length; i++){
                    e.temperament += e.temperaments[i].name.toString() + ", "
                }
            })
            return (
                <div className="background">
                    <div className="contenedor">
                        <p className="text">{aDog[0]?.name}</p>
                        <p className="text2">{aDog[0]?.height}</p>
                        <p className="text2">{aDog[0]?.weight}</p>
                        <p className="text2">{aDog[0]?.life_span}</p>
                        <p className="text2">{aDog[0]?.temperament}</p>
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div>
        {typeof(aDog) === "undefined" 
        ? <h1>Loading...</h1>
        : renderDog(aDog)
        }
        </div>
    )
    
}

module.export = DogDetail;