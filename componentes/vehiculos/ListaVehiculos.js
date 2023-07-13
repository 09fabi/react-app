import React, { useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import updateImage from "./update.png";
import deleteImage from "./delete.png";

function ListaVehiculos() {
  const [vehiculo, setVehiculo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Vehiculos");
        setVehiculo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchVehiculo();

    $(document).ready(() => {
      $(".table").DataTable();
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Lista de vehiculos</h1>
      <hr />
      
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculo.map((vehiculo) => (
            <tr key={vehiculo.id_vehiculo}>
              <td>{vehiculo.id_vehiculo}</td>
              <td>{vehiculo.id_cliente}</td>
              <td>{vehiculo.marca_vehiculo}</td>
              <td>{vehiculo.modelo_vehiculo}</td>
              <td>
                <Link to={`/vehiculos/actualizar/${vehiculo.id_vehiculo}`}>
                  <img src={updateImage} alt="Actualizar" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
                </Link>
                <Link to={`/vehiculos/eliminar/${vehiculo.id_vehiculo}`}>
                  <img src={deleteImage} alt="Eliminar" style={{ marginLeft: "5px", width: "20px", height: "20px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/vehiculos/agregar" className="btn btn-primary" style={{ marginBottom: "20px" }}>Registrar Vehiculo</Link>
    </div>
  );
}

export default ListaVehiculos;
