import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import axios from 'axios';

import "./styles.css";

function Consult() {
  const history = useHistory();
  const location = useLocation();
  
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(`http://localhost:3333/users/${location.state.id}`);

      setData(data);
    }

    fetchData()
  }, [location.state.id])

  return (
    <div className="container">
      <h1>Usuário</h1>

      <div className="texts">
        <span><b>Nome:</b> {data.nome}</span>
        <span><b>Sobrenome:</b> {data.sobreNome}</span>
        <span><b>Nacionalidade:</b> {data.nacionalidade}</span>
        <span><b>Cep:</b> {data.cep}</span>
        <span><b>Cpf:</b> {data.cpf}</span>
        <span><b>Estado:</b> {data.estado}</span>
        <span><b>Cidade:</b> {data.cidade}</span>
        <span><b>Logradouro:</b> {data.logradouro}</span>
        <span><b>Email:</b> {data.email}</span>
        <span><b>Telefone:</b> {data.telefone}</span>
      </div>

      <div className="buttons">
        <button onClick={() => history.push("/")}>Voltar</button>
      </div>
    </div>
  );
}

export default Consult;