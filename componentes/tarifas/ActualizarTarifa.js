import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarTarifas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [id_tarifa, setIdTarifa] = useState("");
  const [tipo_vehiculo, setTipoVehiculo] = useState("");
  const [precio_hora, setPrecioHora] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarDatosTarifas = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Tarifas/${id}`);
        const tarifa = response.data[0];
        setIdTarifa(tarifa.id_tarifa);
        setTipoVehiculo(tarifa.tipo_vehiculo);
        setPrecioHora(tarifa.precio_hora);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatosTarifas();
  }, [id]);

  const validateForm = () => {
    const errors = {};

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
      const tarifa = {
        tipo_vehiculo,
        precio_hora,
      };
      await axios.patch(`http://192.168.18.250/api/Tarifas/${id}`, tarifa);
      navigate("/tarifas");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Tarifa</h1>
      <hr></hr>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID</label>
          <input
            type="text"
            className="form-control"
            value={id_tarifa}
            onChange={(e) => setIdTarifa(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            className="form-control"
            value={tipo_vehiculo}
            onChange={(e) => setTipoVehiculo(e.target.value)}
          ></input>
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
            value={precio_hora}
            onChange={(e) => setPrecioHora(e.target.value)}
          ></input>
          {errors.precio_hora && (
            <div className="text-danger">
              <strong>{errors.precio_hora}</strong>
            </div>
          )}
        </div>
        <button style={{ marginBottom: "15px" }} type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarTarifas;
