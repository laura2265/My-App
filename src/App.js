import React, {useEffect} from "react";
import {BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import ConsultarReserva from "./Components/ConsultarReserva";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsultarReserva/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
