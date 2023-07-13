import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearVehiculo() {
  const [id_vehiculo, setIdVehiculo] = useState("");
  const [id_cliente, setIdCliente] = useState("");
  const [marca_vehiculo, setMarcaVehiculo] = useState("");
  const [modelo_vehiculo, setModeloVehiculo] = useState("");
  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Clientes");
        setClientes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientes();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!id_vehiculo.trim()) {
      errors.id_vehiculo = "El ID del vehículo es requerido";
    } else if (!/^\d+$/.test(id_vehiculo)) {
      errors.id_vehiculo = "El ID del vehículo debe ser un número válido";
    }

    if (!marca_vehiculo.trim()) {
      errors.marca_vehiculo = "La marca del vehículo es requerida";
    }

    if (!modelo_vehiculo.trim()) {
      errors.modelo_vehiculo = "El modelo del vehículo es requerido";
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
      await axios.post("http://192.168.18.250/api/Vehiculos", {
        id_vehiculo,
        id_cliente,
        marca_vehiculo,
        modelo_vehiculo,
      });
      navigate("/vehiculos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginBottom: "10px", marginTop: "15px" }} className="container">
      <h1>Crear Vehículo</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ID Vehículo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese un ID numerico"
            value={id_vehiculo}
            onChange={(e) => setIdVehiculo(e.target.value)}
          />
          {errors.id_vehiculo && (
            <div className="text-danger">
              <strong>{errors.id_vehiculo}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "10px", marginTop: "15px" }} className="form-group">
          <label>ID Cliente</label>
          <select
            className="form-control"
            value={id_cliente}
            onChange={(e) => setIdCliente(e.target.value)}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.id_cliente}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px", marginTop: "15px" }} className="form-group">
          <label>Marca del Vehículo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese la marca del vehiculo"
            value={marca_vehiculo}
            onChange={(e) => setMarcaVehiculo(e.target.value)}
          />
          {errors.marca_vehiculo && (
            <div className="text-danger">
              <strong>{errors.marca_vehiculo}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "10px", marginTop: "15px" }} className="form-group">
          <label>Modelo del Vehículo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el modelo del vehiculo"
            value={modelo_vehiculo}
            onChange={(e) => setModeloVehiculo(e.target.value)}
          />
          {errors.modelo_vehiculo && (
            <div className="text-danger">
              <strong>{errors.modelo_vehiculo}</strong>
            </div>
          )}
        </div>
        <button type="submit" style={{ marginBottom: "10px", marginTop: "15px" }} className="btn btn-primary">
          Registrar Vehículo
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

export default CrearVehiculo;
