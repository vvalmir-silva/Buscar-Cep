import { useState } from "react";
import styled from "styled-components";
import imagemBody from "./img/capa.jpg";

import "./index.css";

const HeaderComponents = styled.header`
  background-color: var(--escuro);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const HeaderDiv = styled.div`
  text-align: center;
`;

const HeaderInput = styled.input`
  margin: 0 auto;
  font-size: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--claro);
  border: 1px solid var(--primeira);
`;
const BuscarCepH1 = styled.h1`
  font-family: sans-serif;
  cursor: pointer;
  color: white;
`;

const DivCompondentsCompondents = styled.div`
  color: white;
  font-size: 26px;
  text-align: center;
`;

function App() {
  const [endereco, setEndereco] = useState("");

  function manipularEndereco(event) {
    const cep = event.target.value;

    setEndereco({
      cep,
    });
    if (cep && cep.length === 8) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEndereco((enderecoAntigo) => {
            return {
              ...enderecoAntigo,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.estado,
              estado: dados.estado,
              regiao: dados.regiao,
              ibge: dados.ibge,
              ddd: dados.ddd,
            };
          });
        });
    }
  }

  return (
    <HeaderDiv>
      <HeaderComponents>
        <div>
          <img src={imagemBody} alt="Minha imagem" />
        </div>
        <BuscarCepH1>Buscar CEP</BuscarCepH1>
        <HeaderInput
          onChange={manipularEndereco}
          placeholder="Digite seu cep"
        />

        <section>
          <DivCompondentsCompondents>
            <div>Cep: {endereco.cep}</div>
            <div>Rua: {endereco.rua}</div>
            <div>Bairro: {endereco.bairro}</div>
            <div>Cidade: {endereco.cidade}</div>
            <div>Estado: {endereco.estado}</div>
            <div>Região: {endereco.regiao}</div>
            <div>Ibge: {endereco.ibge}</div>
            <div>DDD: {endereco.ddd}</div>
          </DivCompondentsCompondents>
        </section>
      </HeaderComponents>
    </HeaderDiv>
  );
}

export default App;
