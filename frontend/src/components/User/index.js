import React from 'react';

import "./styles.css";

function User() {
  return (
    <div className="user">
      <div className="detail">
        <img src="https://api.hello-avatar.com/adorables/myseed" alt="userImg" />

      
        <nav>
          <h3>Gabriel Catoni</h3>
          <p>catoni513@gmail.com</p>
        </nav>
      </div>

      <button>Editar</button>
    </div>
  );
}

export default User;