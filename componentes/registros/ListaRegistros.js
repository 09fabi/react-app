import React, { useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import updateImage from "./update.png";
import deleteImage from "./delete.png";

function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Registros");
        setRegistros(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchRegistro();

    $(document).ready(() => {
      $(".table").DataTable();
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Lista de Registros</h1>
      <hr />
      
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Modelo Vehiculo</th>
            <th>Tarifa (CLP)</th>
            <th>Nombre Estacionamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registros) => (
            <tr key={registros.id_registro}>
              <td>{registros.id_registro}</td>
              <td>{registros.nombre_cliente}</td>
              <td>{registros.modelo_vehiculo}</td>
              <td>{registros.precio_hora}</td>
              <td>{registros.nombre_estacionamiento}</td>
              <td>
                <Link to={`/registros/actualizar/${registros.id_registro}`}>
                  <img src={updateImage} alt="Actualizar" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
                </Link>
                <Link to={`/registros/eliminar/${registros.id_registro}`}>
                  <img src={deleteImage} alt="Eliminar" style={{ marginLeft: "5px", width: "20px", height: "20px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/registros/agregar" className="btn btn-primary" style={{ marginBottom: "20px" }}>Registrar</Link>
    </div>
  );
}

export default ListaRegistros;

