import React, { useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import updateImage from "./update.png";
import deleteImage from "./delete.png";

function ListaTarifas() {
  const [tarifa, setTarifa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTarifa = async () => {
      try {
        const response = await axios.get("http://192.168.18.250/api/Tarifas");
        setTarifa(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchTarifa();

    $(document).ready(() => {
      $(".table").DataTable();
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Lista de Tarifas</h1>
      <hr />
      
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo Vehiculo</th>
            <th>Precio por Hora (CLP)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarifa.map((tarifa) => (
            <tr key={tarifa.id_tarifa}>
              <td>{tarifa.id_tarifa}</td>
              <td>{tarifa.tipo_vehiculo}</td>
              <td>{tarifa.precio_hora}</td>
              <td>
                <Link to={`/tarifas/actualizar/${tarifa.id_tarifa}`}>
                  <img src={updateImage} alt="Actualizar" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
                </Link>
                <Link to={`/tarifas/eliminar/${tarifa.id_tarifa}`}>
                  <img src={deleteImage} alt="Eliminar" style={{ marginLeft: "5px", width: "20px", height: "20px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/tarifas/agregar" className="btn btn-primary" style={{ marginBottom: "20px" }}>Registrar Tarifa</Link>
    </div>
  );
}

export default ListaTarifas;
