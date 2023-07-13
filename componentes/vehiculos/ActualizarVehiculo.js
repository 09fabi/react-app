import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [id_vehiculo, setIdVehiculo] = useState("");
  const [id_cliente, setIdCliente] = useState("");
  const [marca_vehiculo, setMarcaVehiculo] = useState("");
  const [modelo_vehiculo, setModeloVehiculo] = useState("");

  useEffect(() => {
    const cargarDatosVehiculos = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Vehiculos/${id}`);
        const vehiculo = response.data[0];
        setIdVehiculo(vehiculo.id_vehiculo);
        setIdCliente(vehiculo.id_cliente);
        setMarcaVehiculo(vehiculo.marca_vehiculo);
        setModeloVehiculo(vehiculo.modelo_vehiculo);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatosVehiculos();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const cliente = {
        id_vehiculo,
        id_cliente,
        marca_vehiculo,
        modelo_vehiculo,
      };
      await axios.patch(`http://192.168.18.250/api/Vehiculos/${id}`, cliente);
      navigate("/vehiculos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Vehiculo</h1>
      <hr></hr>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "10px", marginTop:"10px" }} className="form-group">
          <label>ID</label>
          <input
            type="text"
            className="form-control"
            value={id_vehiculo}
            onChange={(e) => setIdVehiculo(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "10px", marginTop:"10px" }} className="form-group">
          <label>ID Cliente</label>
          <input
            type="text"
            className="form-control"
            value={id_cliente}
            onChange={(e) => setIdCliente(e.target.value)}
            disabled
          ></input>
        </div>
        <div style={{ marginBottom: "10px", marginTop:"10px" }} className="form-group">
          <label>Marca</label>
          <input
            type="text"
            className="form-control"
            value={marca_vehiculo}
            onChange={(e) => setMarcaVehiculo(e.target.value)}
          ></input>
        </div>
        <div style={{ marginBottom: "10px", marginTop:"10px" }} className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={modelo_vehiculo}
            onChange={(e) => setModeloVehiculo(e.target.value)}
          ></input>
        </div>
        <button type="submit" style={{ marginBottom: "10px", marginTop:"10px" }} className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarVehiculo;
