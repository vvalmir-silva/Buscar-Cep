import { useState } from "react";
import styled from "styled-components";
import imagemBody from "./img/capa.jpg";

const HeaderComponents = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const HeaderDiv = styled.div`
  text-align: center;
`;

const HeaderInput = styled.input`
  font-size: 20px;
  display: flex;
  border-radius: 10px;
  align-items: center;
`;
const BuscarCepH1 = styled.h1`
  font-family: sans-serif;
  cursor: pointer;
  color: white;
`;

const UlConpondentsCompondents = styled.h1`
  color: white;
  font-size: 26px;
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
        <BuscarCepH1>BUSCAR CEP</BuscarCepH1>
        <HeaderInput
          onChange={manipularEndereco}
          className="cep"
          placeholder="Digite seu cep"
        />

        <ul>
          <UlConpondentsCompondents>
            <li>Cep: {endereco.cep}</li>
            <li>Rua: {endereco.rua}</li>
            <li>Bairro: {endereco.bairro}</li>
            <li>Cidade: {endereco.cidade}</li>
            <li>Estado: {endereco.estado}</li>
            <li>Região: {endereco.regiao}</li>
            <li>Ibge: {endereco.ibge}</li>
            <li>DDD: {endereco.ddd}</li>
          </UlConpondentsCompondents>
        </ul>
      </HeaderComponents>
    </HeaderDiv>
  );
}

export default App;
