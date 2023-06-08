import React from "react";
import '../styles/buscador.css';
import  submitForm  from './api'; // Importa la función submitForm desde api.js

const Buscador = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    //console.log(event.target)
    submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input type="text" placeholder="Escribe aquí" name="busqueda" />
      <button className="icon" type="submit"></button>
    </form> 
  );
};

export default Buscador;
