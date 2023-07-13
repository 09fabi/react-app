import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearRegistro() {
  const [id_registro, setIdRegistro] = useState("");
  const [nombre_cliente, setNombreCliente] = useState("");
  const [modelo_vehiculo, setModeloVehiculo] = useState("");
  const [precio_hora, setPrecioHora] = useState("");
  const [nombre_estacionamiento, setNombreEstacionamiento] = useState("");
  const [clientes, setCliente] = useState([]);
  const [vehiculo, setVehiculo] = useState([]);
  const [tarifa, setTarifa] = useState([]);
  const [estacionamiento, setEstacionamiento] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Clientes");
        setCliente(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Vehiculos");
        setVehiculo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehiculo();
  }, []);

  useEffect(() => {
    const fetchTarifa = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Tarifas");
        setTarifa(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTarifa();
  }, []);

  useEffect(() => {
    const fetchEstacionamiento = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Estacionamiento");
        setEstacionamiento(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstacionamiento();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!id_registro.trim()) {
      errors.id_registro = "El ID del registro es requerido";
    } else if (!/^\d+$/.test(id_registro)) {
      errors.id_registro = "El ID del registro debe contener solo números";
    }

    if (!nombre_cliente) {
      errors.nombre_cliente = "Debe seleccionar un cliente";
    }

    if (!modelo_vehiculo) {
      errors.modelo_vehiculo = "Debe seleccionar un vehículo";
    }

    if (!precio_hora) {
      errors.precio_hora = "Debe seleccionar una tarifa";
    }

    if (!nombre_estacionamiento) {
      errors.nombre_estacionamiento = "Debe seleccionar un estacionamiento";
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
      await axios.post("http://192.168.18.250/api/Registros", {
        id_registro,
        nombre_cliente,
        modelo_vehiculo,
        precio_hora,
        nombre_estacionamiento,
      });
      navigate("/registros");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Crear Registro</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID Registro</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese una ID numerica"
            value={id_registro}
            onChange={(e) => setIdRegistro(e.target.value)}
          />
          {errors.id_registro && (
            <div className="text-danger">
              <strong>{errors.id_registro}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "25px" }} className="form-group">
          <label>Cliente</label>
          <select
            className="form-control"
            value={nombre_cliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((clientes) => (
              <option key={clientes.nombre_cliente} value={clientes.nombre_cliente}>
                {clientes.nombre_cliente}
              </option>
            ))}
          </select>
          {errors.nombre_cliente && (
            <div className="text-danger">
              <strong>{errors.nombre_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "25px" }} className="form-group">
          <label>Modelo Vehiculo</label>
          <select
            className="form-control"
            value={modelo_vehiculo}
            onChange={(e) => setModeloVehiculo(e.target.value)}
          >
            <option value="">Seleccione un vehiculo</option>
            {vehiculo.map((vehiculo) => (
              <option key={vehiculo.modelo_vehiculo} value={vehiculo.modelo_vehiculo}>
                {vehiculo.modelo_vehiculo}
              </option>
            ))}
          </select>
          {errors.modelo_vehiculo && (
            <div className="text-danger">
              <strong>{errors.modelo_vehiculo}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "25px" }} className="form-group">
          <label>Precio Tarifa</label>
          <select
            className="form-control"
            value={precio_hora}
            onChange={(e) => setPrecioHora(e.target.value)}
          >
            <option value="">Seleccione una tarifa</option>
            {tarifa.map((tarifa) => (
              <option key={tarifa.precio_hora} value={tarifa.precio_hora}>
                {tarifa.precio_hora}
              </option>
            ))}
          </select>
          {errors.precio_hora && (
            <div className="text-danger">
              <strong>{errors.precio_hora}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "25px" }} className="form-group">
          <label>Nombre Estacionamientos</label>
          <select
            className="form-control"
            value={nombre_estacionamiento}
            onChange={(e) => setNombreEstacionamiento(e.target.value)}
          >
            <option value="">Seleccione un estacionamiento</option>
            {estacionamiento.map((estacionamiento) => (
              <option key={estacionamiento.nombre_estacionamiento} value={estacionamiento.nombre_estacionamiento}>
                {estacionamiento.nombre_estacionamiento}
              </option>
            ))}
          </select>
          {errors.nombre_estacionamiento && (
            <div className="text-danger">
              <strong>{errors.nombre_estacionamiento}</strong>
            </div>
          )}
        </div>
        
        <button type="submit" style={{ marginBottom: "15px" }} className="btn btn-primary">
          Crear Registro
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

export default CrearRegistro;
