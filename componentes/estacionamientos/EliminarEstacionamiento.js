import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarEstacionamiento() {
  const [estacionamiento, setEstacionamiento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstacionamiento = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Estacionamiento/${id}`);
        setEstacionamiento(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchEstacionamiento();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://192.168.18.250/api/Estacionamiento/${id}`);
      navigate("/estacionamientos");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>¿Estás seguro de que quieres eliminar este estacionamiento?</h1>
      <hr />
      {estacionamiento && (
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

export default EliminarEstacionamiento;
