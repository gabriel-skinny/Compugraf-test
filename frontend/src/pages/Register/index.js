import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import "./styles.css";

import { useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory()
  const formRef = useRef(null);
  const estadoRef = useRef(null);
  const cidadeRef = useRef(null);
  const logradouroRef = useRef(null);


  const [error, setError] = useState(false);

  async function handleCepChange(e) {
    if(e.target.value.length === 8) {
      try {
        const { data } = await axios.get(`http://viacep.com.br/ws/${e.target.value}/json/`);

        estadoRef.current.value = data.uf;
        cidadeRef.current.value = data.localidade;
        logradouroRef.current.value = data.logradouro;

        estadoRef.current.disabled = true;
        cidadeRef.current.disabled = true;
        logradouroRef.current.disabled = true;

      } catch (error) {

        console.log("ERROR")
      }
    }
  }

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
        cep: Yup.number().required("cep é obrigatorio"),
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

      await axios.post("http://localhost:3333/users", {
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
      <h1>Cadastrar um usuário</h1>

      <input name="nome" type="text" placeholder="Digite seu nome" />          
      <input name="sobrenome" type="text" placeholder="Digite seu sobrenome"/>
      <input name="nacionalidade" type="text" placeholder="Digite sua nacionalidade"/>
      <input name="CEP" type="text" onChange={(e) => handleCepChange(e)} placeholder="Digite seu CEP"/>
      <input name="CPF" type="text" placeholder="Digite seu CPF"/>
      <input ref={estadoRef} name="estado" type="text" placeholder="Digite seu estado"/>
      <input ref={cidadeRef} name="cidade" type="text" placeholder="Digite seu cidade"/>
      <input ref={logradouroRef} name="logradouro" type="text" placeholder="Digite seu logradouro"/>
      <input name="email" type="text" placeholder="Digite seu email"/>
      <input name="telefone" type="text" placeholder="Digite seu telefone"/>

      <div className="buttons">
        <button onClick={() => history.push("/")}>Cancelar</button>
        <button type="submit" className="enviar">Enviar</button>
      </div>

    </form>
  );
}

export default Register;