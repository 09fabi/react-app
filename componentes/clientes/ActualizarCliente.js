import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [id_cliente, setIdCliente] = useState("");
  const [nombre_cliente, setNombreCliente] = useState("");
  const [direccion_cliente, setDireccionCliente] = useState("");
  const [telefono_cliente, setTelefonoCliente] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarDatosCliente = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Clientes/${id}`);
        const cliente = response.data[0];
        setIdCliente(cliente.id_cliente);
        setNombreCliente(cliente.nombre_cliente);
        setDireccionCliente(cliente.direccion_cliente);
        setTelefonoCliente(cliente.telefono_cliente);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatosCliente();
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (!nombre_cliente.trim()) {
      errors.nombre_cliente = "El nombre del cliente es requerido";
    }

    if (!direccion_cliente.trim()) {
      errors.direccion_cliente = "La dirección del cliente es requerida";
    }

    if (!telefono_cliente.trim()) {
      errors.telefono_cliente = "El teléfono del cliente es requerido";
    } else if (!/^[0-9]+$/.test(telefono_cliente)) {
      errors.telefono_cliente = "Debe ser un número telefónico válido";
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
      const cliente = {
        nombre_cliente,
        direccion_cliente,
        telefono_cliente
      };
      await axios.patch(`http://192.168.18.250/api/Clientes/${id}`, cliente);
      navigate("/clientes");
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
            value={id_cliente}
            onChange={(e) => setIdCliente(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre_cliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            placeholder="Ingrese su primer nombre"
          ></input>
          {errors.nombre_cliente && (
            <div className="text-danger">
              <strong>{errors.nombre_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion_cliente}
            onChange={(e) => setDireccionCliente(e.target.value)}
            placeholder="Ingrese la dirección del cliente"
          ></input>
          {errors.direccion_cliente && (
            <div className="text-danger">
              <strong>{errors.direccion_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={telefono_cliente}
            onChange={(e) => setTelefonoCliente(e.target.value)}
            placeholder="Ingrese número telefónico sin +569"
          ></input>
          {errors.telefono_cliente && (
            <div className="text-danger">
              <strong>{errors.telefono_cliente}</strong>
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

export default ActualizarCliente;
