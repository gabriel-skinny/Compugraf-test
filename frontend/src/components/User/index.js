import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import "./styles.css";

function User({ user, setData}) {
  const history = useHistory();

  async function deleteUser(id) {
    axios.delete(`http://localhost:3333/users/${id}`)

    setData(previus => previus.filter(preUser => preUser.id !== user.id))
  }

  return (
    <div className="user">
      <div className="detail">
        <img src="https://api.hello-avatar.com/adorables/myseed" alt="userImg" />

      
        <button onClick={() => history.push({ pathname: "/consultar", state: { id: user.id }})}>
          <h3>{`${user.nome} ${user.sobreNome}`}</h3>
          <p>{user.email}</p>
        </button>
      </div>

      <div className="buttons">
        <button onClick={() => history.push({ pathname: "/editar", state: { id: user.id }})}>Editar</button>
        <button onClick={() => deleteUser(user.id)} className="delete">Deletar</button>
      </div>
    </div>
  );
}

export default User;