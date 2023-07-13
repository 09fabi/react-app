import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearTarifa() {
  const [id_tarifa, setIdTarifa] = useState("");
  const [tipo_vehiculo, setTipoVehiculo] = useState("");
  const [precio_hora, setPrecioHora] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!id_tarifa.trim()) {
      errors.id_tarifa = "El ID de la tarifa es requerido";
    } else if (!/^\d+$/.test(id_tarifa)) {
      errors.id_tarifa = "El ID de la tarifa debe ser un número válido";
    }

    if (!tipo_vehiculo.trim()) {
      errors.tipo_vehiculo = "El tipo de vehículo es requerido";
    } else if (!/^[a-zA-Z]+$/.test(tipo_vehiculo)) {
      errors.tipo_vehiculo = "El tipo de vehículo debe contener solo letras";
    }

    if (!precio_hora.trim()) {
      errors.precio_hora = "El precio por hora es requerido";
    } else if (!/^\d+$/.test(precio_hora)) {
      errors.precio_hora = "El precio por hora debe ser un número válido";
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
      await axios.post("http://192.168.18.250/api/Tarifas", {
        id_tarifa,
        tipo_vehiculo,
        precio_hora,
      });
      navigate("/tarifas");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Crear tarifa</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID Tarifa</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un ID numerico"
            value={id_tarifa}
            onChange={(e) => setIdTarifa(e.target.value)}
          />
          {errors.id_tarifa && (
            <div className="text-danger">
              <strong>{errors.id_tarifa}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un tipo de vehiculo valido"
            value={tipo_vehiculo}
            onChange={(e) => setTipoVehiculo(e.target.value)}
          />
          {errors.tipo_vehiculo && (
            <div className="text-danger">
              <strong>{errors.tipo_vehiculo}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Precio por Hora</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un precio en CLP sin simbolo peso"
            value={precio_hora}
            onChange={(e) => setPrecioHora(e.target.value)}
          />
          {errors.precio_hora && (
            <div className="text-danger">
              <strong>{errors.precio_hora}</strong>
            </div>
          )}
        </div>
        <button type="submit" style={{ marginBottom: "10px", marginTop: "15px" }} className="btn btn-primary">
          Registrar Tarifa
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

export default CrearTarifa;
