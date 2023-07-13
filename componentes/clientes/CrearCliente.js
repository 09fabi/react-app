import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearCliente() {
  const [id_cliente, setIdCliente] = useState("");
  const [nombre_cliente, setNombreCliente] = useState("");
  const [direccion_cliente, setDireccionCliente] = useState("");
  const [telefono_cliente, setTelefonoCliente] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!id_cliente.trim()) {
      errors.id_cliente = "El ID del cliente es requerido";
    } else if (!/^\d{8,9}$/.test(id_cliente)) {
      errors.id_cliente = "Debe ser un rut válido";
    }

    if (!nombre_cliente.trim()) {
      errors.nombre_cliente = "El nombre del cliente es requerido";
    }

    if (!direccion_cliente.trim()) {
      errors.direccion_cliente = "La dirección del cliente es requerida";
    }

    if (!telefono_cliente.trim()) {
      errors.telefono_cliente = "El teléfono del cliente es requerido";
    } else if (!/^[0-9]+$/.test(telefono_cliente)) {
      errors.telefono_cliente = "Debe ser un numero telefonico valido";
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
      await axios.post("http://192.168.18.250/api/Clientes", {
        id_cliente,
        nombre_cliente,
        direccion_cliente,
        telefono_cliente,
      });
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Crear cliente</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>ID Cliente</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese rut sin puntos ni guion"
            value={id_cliente}
            onChange={(e) => setIdCliente(e.target.value)}
          />
          {errors.id_cliente && (
            <div className="text-danger">
              <strong>{errors.id_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Nombre Cliente</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese su primer nombre"
            value={nombre_cliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          />
          {errors.nombre_cliente && (
            <div className="text-danger">
              <strong>{errors.nombre_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Dirección Cliente</label>
          <input
            type="text"
            className="form-control"
            value={direccion_cliente}
            onChange={(e) => setDireccionCliente(e.target.value)}
          />
          {errors.direccion_cliente && (
            <div className="text-danger">
              <strong>{errors.direccion_cliente}</strong>
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }} className="form-group">
          <label>Teléfono Cliente</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese numero telefonico sin +569"
            value={telefono_cliente}
            onChange={(e) => setTelefonoCliente(e.target.value)}
          />
          {errors.telefono_cliente && (
            <div className="text-danger">
              <strong>{errors.telefono_cliente}</strong>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginBottom: "10px", marginTop: "15px" }}
        >
          Registrar Cliente
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

export default CrearCliente;
