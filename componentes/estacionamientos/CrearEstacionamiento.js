import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearEstacionamiento() {
  const [id_estacionamiento, setIdEstacionamiento] = useState("");
  const [nombre_estacionamiento, setNombreEstacionamiento] = useState("");
  const [direccion_estacionamiento, setDireccionEstacionamiento] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!id_estacionamiento.trim()) {
      errors.id_estacionamiento = "El ID del estacionamiento es requerido";
    } else if (!/^\d+$/.test(id_estacionamiento)) {
      errors.id_estacionamiento = "Debe ser un número válido";
    }

    if (!nombre_estacionamiento.trim()) {
      errors.nombre_estacionamiento = "El nombre del estacionamiento es requerido";
    }

    if (!direccion_estacionamiento.trim()) {
      errors.direccion_estacionamiento = "La dirección del estacionamiento es requerida";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://192.168.18.250/api/Estacionamiento", {
        id_estacionamiento,
        nombre_estacionamiento,
        direccion_estacionamiento,
      });
      navigate("/estacionamientos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Crear estacionamiento</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID Estacionamiento</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un ID numerico"
            value={id_estacionamiento}
            onChange={(e) => setIdEstacionamiento(e.target.value)}
          />
          {errors.id_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.id_estacionamiento}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Nombre Estacionamiento</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un nombre valido"
            value={nombre_estacionamiento}
            onChange={(e) => setNombreEstacionamiento(e.target.value)}
          />
          {errors.nombre_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.nombre_estacionamiento}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Dirección Estacionamiento</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese una direccion valida"
            value={direccion_estacionamiento}
            onChange={(e) => setDireccionEstacionamiento(e.target.value)}
          />
          {errors.direccion_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.direccion_estacionamiento}</strong>
            </div>
          )}
        </div>
        <button style={{ marginBottom: "15px" }} type="submit" className="btn btn-primary">
          Registrar Estacionamiento
        </button>
      </form>
      <style>
        {`
        ::placeholder {
          font-style: italic;
        }
      `}
      </style>
    </div>
  );
}

export default CrearEstacionamiento;
