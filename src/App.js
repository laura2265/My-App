import React, {useEffect} from "react";
import {BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import ConsultarReserva from "./Components/ConsultarReserva";
import CrearReserva from "./Components/CrearReserva";
import ActualilarReserva from "./Components/ActualizarReserva";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsultarReserva/>}></Route>
        <Route path="/create" element={<CrearReserva/>}></Route>
        <Route path="/update/:id" element={<ActualilarReserva/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
