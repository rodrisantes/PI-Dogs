import React from "react";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import CreateDogPage from "./Components/CreateDogPage/CreateDogPage";
import DogDetail from "./Components/DogDetail/DogDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path = "/dog" element = {<CreateDogPage/>}/>
            <Route path="/dog/:id" element={<DogDetail/>} />
          </Routes> 

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
