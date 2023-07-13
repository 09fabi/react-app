import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarRegistro() {
  const [registros, setRegistros] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await axios.get(`http://192.168.18.250/api/Registros/${id}`);
        setRegistros(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchRegistro();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://192.168.18.250/api/Registros/${id}`);
      navigate("/registros");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>¿Estás seguro de que quieres eliminar este registro?</h1>
      <hr />
      {registros && (
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

export default EliminarRegistro;
