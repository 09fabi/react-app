import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarTarifa() {
  const [tarifa, setTarifa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTarifa = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Tarifas/${id}`);
        setTarifa(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchTarifa();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://192.168.18.250/api/Tarifas/${id}`);
      navigate("/tarifas");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>¿Estás seguro de que quieres eliminar esta Tarifa?</h1>
      <hr />
      {tarifa && (
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

export default EliminarTarifa;
