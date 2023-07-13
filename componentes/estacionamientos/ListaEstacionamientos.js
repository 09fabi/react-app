import React, { useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import updateImage from "./update.png";
import deleteImage from "./delete.png";

function ListaEstacionamientos() {
  const [estacionamiento, setEstacionamiento] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Estacionamiento");
        setEstacionamiento(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchClientes();

    $(document).ready(() => {
      $(".table").DataTable();
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Lista de Estacionamientos</h1>
      <hr />
      
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estacionamiento.map((estacionamiento) => (
            <tr key={estacionamiento.id_estacionamiento}>
              <td>{estacionamiento.id_estacionamiento}</td>
              <td>{estacionamiento.nombre_estacionamiento}</td>
              <td>{estacionamiento.direccion_estacionamiento}</td>
              <td>
                <Link to={`/estacionamientos/actualizar/${estacionamiento.id_estacionamiento}`}>
                  <img src={updateImage} alt="Actualizar" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
                </Link>
                <Link to={`/estacionamientos/eliminar/${estacionamiento.id_estacionamiento}`}>
                  <img src={deleteImage} alt="Eliminar" style={{ marginLeft: "5px", width: "20px", height: "20px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/estacionamientos/agregar" className="btn btn-primary" style={{ marginBottom: "20px" }}>Registrar Estacionamiento</Link>
    </div>
  );
}

export default ListaEstacionamientos;
