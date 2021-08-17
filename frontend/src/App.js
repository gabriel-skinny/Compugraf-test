import "./styles/home.css";

import User from "./components/User";

function App() {
  return (
    <div className="box">
      <h1>Veja todos os usuarios</h1>
      <p>E adcione mas quem vc quiser</p>

      <div className="users">
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>

      <button className="add">Adicionar</button>
    </div>
  );
}

export default App;
