import "./styles.css";

import User from "../../components/User";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

function Home() {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:3333/users");

      setData(data);
    }

    fetchData()
  }, [])
  return (
    <div className="box">
      <h1>Veja todos os usuários</h1>
      <p>E adcione mais quem vc quiser</p>

      <div className="users">
        {data && data.map(user =>( 
          <User key={user.id} user={user} setData={setData}/>
        ))}
      </div>

      <button onClick={() => history.push("/cadastro")} className="add">Adicionar</button>
    </div> 
  );
}

export default Home;