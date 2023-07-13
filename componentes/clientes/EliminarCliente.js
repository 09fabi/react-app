import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarCliente() {
  const [cliente, setCliente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Clientes/${id}`);
        setCliente(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://192.168.18.250/api/Clientes/${id}`);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>¿Estás seguro de que quieres eliminar este cliente?</h1>
      <hr />
      {cliente && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p></p>
          <div>
            <button onClick={handleEliminar} className="btn btn-danger">Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarCliente;
