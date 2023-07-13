import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarEstacionamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [id_estacionamiento, setIdEstacionamiento] = useState("");
  const [nombre_estacionamiento, setNombreEstacionamiento] = useState("");
  const [direccion_estacionamiento, setDireccionEstacionamiento] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarDatosEstacionamiento = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Estacionamiento/${id}`);
        const estacionamiento = response.data[0];
        setIdEstacionamiento(estacionamiento.id_estacionamiento);
        setNombreEstacionamiento(estacionamiento.nombre_estacionamiento);
        setDireccionEstacionamiento(estacionamiento.direccion_estacionamiento);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatosEstacionamiento();
  }, [id]);

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
      const estacionamiento = {
        id_estacionamiento,
        nombre_estacionamiento,
        direccion_estacionamiento,
      };
      await axios.patch(`http://192.168.18.250/api/Estacionamiento/${id}`, estacionamiento);
      navigate("/estacionamientos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Estacionamiento</h1>
      <hr></hr>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID</label>
          <input
            type="text"
            className="form-control"
            value={id_estacionamiento}
            onChange={(e) => setIdEstacionamiento(e.target.value)}
          ></input>
          {errors.id_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.id_estacionamiento}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre_estacionamiento}
            onChange={(e) => setNombreEstacionamiento(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion_estacionamiento}
            onChange={(e) => setDireccionEstacionamiento(e.target.value)}
          ></input>
          {errors.direccion_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.direccion_estacionamiento}</strong>
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

export default ActualizarEstacionamiento;
