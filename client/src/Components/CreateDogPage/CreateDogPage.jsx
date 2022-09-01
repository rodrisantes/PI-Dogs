import React, { useEffect, useState } from "react";
import { getTemperaments, postDog } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreateDogPage.css"
import { Link } from "react-router-dom";

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    }
    if (!input.height) {
        errors.height = 'Height is required';
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
        errors.height = "Add a height range. Example: '10-12'"
    }
    if (!input.weight) {
        errors.weight = "Weight is required";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
        errors.weight = "Add a weight range. Example: '10-12'"
    }
    if (!input.life_span) {
        errors.life_span = "Life Span is required"
    }
    if (!input.temperament) {
        errors.temperament = "Add at least one temperament"
    }
    return errors;
};

export default function CreateDog() {
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
    })
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments())
    }, [])

    const allTemps = useSelector((state) => state.temps);
    const allTemps2 = allTemps.filter(e => e.name.length > 2)

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.name && !errors.weight && !errors.height && !errors.life_span) {
            alert("Your breed has been created successfully");
            dispatch(postDog(input))
        }
        else {
            return alert("Something went wrong. Please try again.");
        }
    };

    function handleSelect(e) {
      e.preventDefault();
      console.log(e.target.value)
      setInput({
                ...input,
                temperament: [...input.temperament, e.target.value],
            });
        
    }

    const tempsNames = (array) => {
        let names = [];
        allTemps2?.forEach((e) => (
            array.forEach((id) => {
                if (parseInt(id) === e.id) {
                    names.push(e.name);
                }
            })
        ))
        return names;
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="background">
                <ul>
                    <div className="label">
                        <li>
                            <label>Name:</label>
                        </li>
                    </div>
                    <input className="input" key="name" type="text" name="name" placeholder="Insert name..." onChange={handleInputChange} />
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                    <br />
                    <div className="label">
                        <li>
                            <label>Height:</label>
                        </li>
                    </div>
                    <input className="input" key="height" type="text" name="height" placeholder="Insert height..." onChange={handleInputChange} />
                    {errors.height && (<p className="danger">{errors.height}</p>)}
                    <br />
                    <div className="label">
                        <li>
                            <label>Weight:</label>
                        </li>
                    </div>
                    <input className="input" key="weight" type="text" name="weight" placeholder="Insert weight..." onChange={handleInputChange} value={input.weight} />
                    {errors.weight && (<p className="danger">{errors.weight}</p>)}
                    <br />
                    <div className="label">
                        <li>
                            <label>Life Span:</label>
                        </li>
                    </div>
                    <input className="input" key="life_span" type="text" name="life_span" placeholder="Insert life span..." onChange={handleInputChange} value={input.life_span} />
                    {errors.life_span && (<p className="danger">{errors.life_span}</p>)}
                    <br />
                    <div className="label">
                        <li>
                            <label>Temperament:</label>
                        </li>
                    </div>
                    <select className="select" key="temperaments" name="temperaments" onChange={(e) => handleSelect(e)} required value={input.temperament}>
                        <option>All Temperaments</option>
                        {
                            allTemps2?.map((e) => (
                                <option value={e.name} key={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.temperament && (<p className="danger">{errors.temperament}</p>)}
                    <br />
                    {
                        input.temperament.map((e) => (
                            <p id={e}>
                                {tempsNames([e])}
                            </p>
                        ))
                    }
                    <label name="image" className="title5">
                        Image:
                    </label>
                    <input
                        name="image"
                        value={input.image}
                        placeholder='URL'
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <button className="button" type="submit" name="submit" onClick={handleSubmit}>Create</button>
                </ul>
                <Link to='/home'>
                    <button className='button'> Home </button>
                </Link>            </div>
        </form>

    )

}

module.export = CreateDog;