import React, { useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import updateImage from "./update.png";
import deleteImage from "./delete.png";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Clientes");
        setClientes(response.data);
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
      <h1>Lista de clientes</h1>
      <hr />
      
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td>
              <td>{cliente.nombre_cliente}</td>
              <td>{cliente.direccion_cliente}</td>
              <td>{cliente.telefono_cliente}</td>
              <td>
                <Link to={`/clientes/actualizar/${cliente.id_cliente}`}>
                  <img src={updateImage} alt="Actualizar" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
                </Link>
                <Link to={`/clientes/eliminar/${cliente.id_cliente}`}>
                  <img src={deleteImage} alt="Eliminar" style={{ marginLeft: "5px", width: "20px", height: "20px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/clientes/agregar" className="btn btn-primary" style={{ marginBottom: "20px" }}>Registrar cliente</Link>
    </div>
  );
}

export default ListaClientes;
