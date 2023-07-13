import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarRegistros = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [id_registro, setIdRegistro] = useState("");
  const [modelo_vehiculo, setModeloVehiculo] = useState("");
  const [precio_hora, setPrecioHora] = useState("");
  const [nombre_estacionamiento, setNombreEstacionamiento] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarDatosRegistro = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Registros/${id}`);
        const registro = response.data[0];
        setIdRegistro(registro.id_registro);
        setModeloVehiculo(registro.modelo_vehiculo);
        setPrecioHora(registro.precio_hora);
        setNombreEstacionamiento(registro.nombre_estacionamiento);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatosRegistro();
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (!id_registro.trim()) {
      errors.id_registro = "El ID del registro es requerido";
    } else if (!/^\d+$/.test(id_registro)) {
      errors.id_registro = "El ID del registro debe contener solo números";
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
      const registro = {
        id_registro,
        modelo_vehiculo,
        precio_hora,
        nombre_estacionamiento,
      };
      await axios.patch(`http://192.168.18.250/api/Registros/${id}`, registro);
      navigate("/registros");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Cliente</h1>
      <hr></hr>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID</label>
          <input
            type="text"
            className="form-control"
            value={id_registro}
            onChange={(e) => setIdRegistro(e.target.value)}
          ></input>
          {errors.id_registro && (
            <div className="text-danger">
              <strong>{errors.id_registro}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Modelo Vehiculo</label>
          <input
            type="text"
            className="form-control"
            value={modelo_vehiculo}
            onChange={(e) => setModeloVehiculo(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Tarifa</label>
          <input
            type="text"
            className="form-control"
            value={precio_hora}
            onChange={(e) => setPrecioHora(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Nombre Estacionamiento</label>
          <input
            type="text"
            className="form-control"
            value={nombre_estacionamiento}
            onChange={(e) => setNombreEstacionamiento(e.target.value)}
            disabled
          ></input>
        </div>
        <button type="submit" style={{ marginBottom: "15px" }} className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarRegistros;
