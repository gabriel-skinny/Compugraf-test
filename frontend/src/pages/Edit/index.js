import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';

import "./styles.css";

import axios from 'axios';

import { useHistory, useLocation } from 'react-router-dom';

function Register() {
  const history = useHistory();
  const location = useLocation();
  const formRef = useRef(null);

  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(`http://localhost:3333/users/${location.state.id}`);

      setData(data);
    }

    fetchData()
  }, [location.state.id])

  async function handleSubmit(e) {
    e.preventDefault()

    const data = {
      nome: formRef.current.nome.value,
      sobreNome: formRef.current.sobrenome.value,
      nacionalidade: formRef.current.nacionalidade.value,
      cep: formRef.current.CEP.value,
      cpf: formRef.current.CPF.value,
      estado: formRef.current.estado.value,
      cidade: formRef.current.cidade.value,
      logradouro: formRef.current.logradouro.value,
      email: formRef.current.email.value,
      telefone: formRef.current.telefone.value,
    }

    try {

      const schema = Yup.object().shape({
        nome: Yup.string().required("Nome é obrigatorio"),
        sobreNome: Yup.string().required("sobrenome é obrigatorio"),
        nacionalidade: Yup.string().required("nacionalidade é obrigatoria"),
        cep: Yup.string().required("cep é obrigatorio"),
        cpf: Yup.number().required("cpf é obrigatorio"),
        estado: Yup.string().required("estado é obrigatorio"),
        cidade: Yup.string().required("cidade é obrigatorio"),
        logradouro: Yup.string().required("logradouro é obrigatorio"),
        email: Yup.string().email("Precisa ser um E-mail valido").required("E-mail é obrigatorio"),
        telefone: Yup.number().required("telefone é obrigatorio"),
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await axios.put(`http://localhost:3333/users/${location.state.id}`, {
        ...data
      })

      history.push("/");
    }catch(err) {
      setError(true);
      console.error(err);
    }
  }

  return (
    <form className={error ? "error" : ""} ref={formRef} onSubmit={handleSubmit}>
      <h1>Editar o usuário</h1>

      <input name="nome" type="text" defaultValue={data.nome} />          
      <input name="sobrenome" type="text" defaultValue={data.sobreNome}/>
      <input name="nacionalidade" type="text" defaultValue={data.nacionalidade}/>
      <input name="CEP" type="text" defaultValue={data.cep}/>
      <input name="CPF" type="text" defaultValue={data.cpf}/>
      <input name="estado" type="text" defaultValue={data.estado}/>
      <input name="cidade" type="text" defaultValue={data.cidade}/>
      <input name="logradouro" type="text" defaultValue={data.logradouro}/>
      <input name="email" type="text" defaultValue={data.email}/>
      <input name="telefone" type="text" defaultValue={data.telefone}/>

      <div className="buttons">
        <button onClick={() => history.push("/")}>Cancelar</button>
        <button type="submit" className="enviar">Enviar</button>
      </div>

    </form>
  );
}

export default Register;