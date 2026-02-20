import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imagemBody from "./img/capa.jpg";

import "./index.css";

const Page = styled.main`
  min-height: 100vh;
  padding: 48px 16px;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  display: grid;
  gap: 18px;
`;

const Card = styled.section`
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid var(--borda);
  border-radius: 18px;
  box-shadow: var(--sombra);
  padding: 22px;
  backdrop-filter: blur(10px);
`;

const Header = styled.header`
  display: grid;
  gap: 14px;
  align-items: center;

  @media (min-width: 840px) {
    grid-template-columns: 320px 1fr;
    gap: 22px;
  }
`;

const ImageWrap = styled.div`
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--borda);
  background: rgba(255, 255, 255, 0.04);

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;

    @media (min-width: 840px) {
      height: 280px;
    }
  }
`;

const HeaderText = styled.div`
  display: grid;
  gap: 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 30px;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  margin: 0;
  color: var(--texto-fraco);
  font-size: 14px;
  line-height: 1.45;
`;

const InputRow = styled.div`
  margin-top: 6px;
  display: grid;
  gap: 10px;
`;

const HeaderInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 14px 14px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: var(--claro);
  border: 1px solid var(--borda);
  outline: none;
  transition: border-color 160ms ease, background 160ms ease;

  &::placeholder {
    color: rgba(227, 232, 240, 0.55);
  }

  &:focus {
    border-color: rgba(79, 70, 229, 0.85);
    background: rgba(255, 255, 255, 0.075);
  }
`;

const Hint = styled.div`
  font-size: 13px;
  color: var(--texto-fraco);
`;

const ResultsTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: rgba(227, 232, 240, 0.9);
  font-weight: 600;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 840px) {
    grid-template-columns: 1.2fr 1.2fr 0.8fr;
  }
`;

const ResultItem = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--borda);
  background: rgba(255, 255, 255, 0.04);
`;

const ResultLabel = styled.div`
  font-size: 12px;
  color: rgba(227, 232, 240, 0.65);
  margin-bottom: 6px;
`;

const ResultValue = styled.div`
  font-size: 15px;
  color: rgba(227, 232, 240, 0.95);
  word-break: break-word;
`;

const EmptyState = styled.div`
  padding: 14px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  color: var(--texto-fraco);
  background: rgba(255, 255, 255, 0.03);
  font-size: 14px;
  line-height: 1.5;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  appearance: none;
  border: 1px solid var(--borda);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(227, 232, 240, 0.95);
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 120ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.085);
    border-color: rgba(79, 70, 229, 0.55);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  border-color: rgba(79, 70, 229, 0.55);
  background: linear-gradient(
    180deg,
    rgba(79, 70, 229, 0.42),
    rgba(79, 70, 229, 0.22)
  );
`;

const StatusMessage = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: var(--texto-fraco);
`;

const HistoryWrap = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 10px;
`;

const HistoryTitle = styled.div`
  font-size: 12px;
  color: rgba(227, 232, 240, 0.65);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const LinkButton = styled.button`
  appearance: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--borda);
  padding: 6px 10px;
  border-radius: 999px;
  color: rgba(227, 232, 240, 0.88);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.35);
    color: rgba(254, 226, 226, 0.98);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const HistoryChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  appearance: none;
  border: 1px solid var(--borda);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(227, 232, 240, 0.92);
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 13px;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.075);
    border-color: rgba(79, 70, 229, 0.45);
  }
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

function App() {
  const [endereco, setEndereco] = useState({});
  const [cepDigitado, setCepDigitado] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [historico, setHistorico] = useState([]);

  const debounceRef = useRef(null);
  const controllerRef = useRef(null);

  const cepSomenteNumeros = cepDigitado.replace(/\D/g, "").slice(0, 8);
  const cepFormatado = cepSomenteNumeros
    ? cepSomenteNumeros.replace(/(\d{5})(\d{0,3})/, (m, p1, p2) =>
        p2 ? `${p1}-${p2}` : p1
      )
    : "";

  const temResultado = Boolean(
    endereco?.rua ||
      endereco?.bairro ||
      endereco?.cidade ||
      endereco?.estado ||
      endereco?.ibge ||
      endereco?.ddd
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("buscar-cep:historico");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setHistorico(parsed.slice(0, 6));
      }
    } catch {
      setHistorico([]);
    }
  }, []);

  const salvarHistorico = useCallback((novoCep) => {
    const cep = novoCep.replace(/\D/g, "").slice(0, 8);
    if (cep.length !== 8) return;

    setHistorico((atual) => {
      const unicos = [cep, ...atual.filter((x) => x !== cep)].slice(0, 6);
      try {
        localStorage.setItem("buscar-cep:historico", JSON.stringify(unicos));
      } catch {
        return unicos;
      }
      return unicos;
    });
  }, []);

  const limparHistorico = useCallback(() => {
    setHistorico([]);
    try {
      localStorage.removeItem("buscar-cep:historico");
    } catch {
      return;
    }
  }, []);

  const removerDoHistorico = useCallback((cepParaRemover) => {
    const cep = String(cepParaRemover || "").replace(/\D/g, "").slice(0, 8);
    if (!cep) return;

    setHistorico((atual) => {
      const novo = atual.filter((x) => x !== cep);
      try {
        localStorage.setItem("buscar-cep:historico", JSON.stringify(novo));
      } catch {
        return novo;
      }
      return novo;
    });
  }, []);

  const limparEndereco = useCallback(() => {
    setEndereco({});
  }, []);

  function atualizarCep(event) {
    const value = event.target.value;
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const masked = digits.replace(/(\d{5})(\d{0,3})/, (m, p1, p2) =>
      p2 ? `${p1}-${p2}` : p1
    );

    setCepDigitado(masked);
    setStatus("");

    if (digits.length < 8) {
      setLoading(false);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      limparEndereco();
    }
  }

  const buscarCep = useCallback(
    (cepParam) => {
      const cep = (cepParam || cepSomenteNumeros)
        .replace(/\D/g, "")
        .slice(0, 8);

      if (cep.length !== 8) {
        setStatus("Digite um CEP válido com 8 dígitos.");
        setLoading(false);
        limparEndereco();
        return;
      }

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setStatus("Buscando endereço...");

      fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        signal: controller.signal,
      })
        .then((resposta) => {
          if (!resposta.ok) {
            throw new Error("Erro ao buscar CEP");
          }
          return resposta.json();
        })
        .then((dados) => {
          if (dados?.erro) {
            limparEndereco();
            setStatus("CEP não encontrado.");
            setLoading(false);
            return;
          }

          setEndereco({
            cep,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
            regiao: dados.regiao || "",
            ibge: dados.ibge,
            ddd: dados.ddd,
          });
          salvarHistorico(cep);
          setStatus("Endereço carregado com sucesso.");
          setLoading(false);
        })
        .catch((err) => {
          if (err?.name === "AbortError") {
            return;
          }
          limparEndereco();
          setStatus("Não foi possível buscar o CEP. Verifique sua conexão.");
          setLoading(false);
        });
    },
    [cepSomenteNumeros, limparEndereco, salvarHistorico]
  );

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (cepSomenteNumeros.length === 8) {
      debounceRef.current = setTimeout(() => {
        buscarCep(cepSomenteNumeros);
      }, 450);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [buscarCep, cepSomenteNumeros]);

  function onKeyDownInput(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      buscarCep();
    }
  }

  function copiarResultado() {
    const texto = [
      `CEP: ${cepFormatado || ""}`,
      endereco.rua ? `Rua: ${endereco.rua}` : "",
      endereco.bairro ? `Bairro: ${endereco.bairro}` : "",
      endereco.cidade ? `Cidade: ${endereco.cidade}` : "",
      endereco.estado ? `UF: ${endereco.estado}` : "",
      endereco.ddd ? `DDD: ${endereco.ddd}` : "",
      endereco.ibge ? `IBGE: ${endereco.ibge}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (!texto) {
      setStatus("Nada para copiar ainda.");
      return;
    }

    if (!navigator?.clipboard?.writeText) {
      setStatus("Seu navegador não permite copiar automaticamente.");
      return;
    }

    navigator.clipboard
      .writeText(texto)
      .then(() => {
        setStatus("Copiado para a área de transferência.");
      })
      .catch(() => {
        setStatus("Não foi possível copiar.");
      });
  }

  return (
    <Page>
      <Container>
        <Card>
          <Header>
            <ImageWrap>
              <img src={imagemBody} alt="Minha imagem" />
            </ImageWrap>

            <HeaderText>
              <div>
                <Title>Buscar CEP</Title>
                <Subtitle>
                  Digite um CEP válido (apenas números). Ao completar 8 dígitos,
                  os dados são buscados automaticamente.
                </Subtitle>
              </div>

              <InputRow>
                <VisuallyHiddenLabel htmlFor="cep-input">
                  Digite o CEP
                </VisuallyHiddenLabel>
                <HeaderInput
                  id="cep-input"
                  value={cepDigitado}
                  onChange={atualizarCep}
                  onKeyDown={onKeyDownInput}
                  placeholder="Ex: 01001000"
                  inputMode="numeric"
                  maxLength={9}
                  aria-describedby="cep-hint cep-status"
                />
                <ActionsRow>
                  <PrimaryButton
                    type="button"
                    onClick={() => buscarCep()}
                    disabled={loading}
                  >
                    {loading ? "Buscando..." : "Buscar"}
                  </PrimaryButton>
                  <Button
                    type="button"
                    onClick={() => {
                      setCepDigitado("");
                      setStatus("");
                      setLoading(false);
                      if (controllerRef.current) controllerRef.current.abort();
                      if (debounceRef.current) clearTimeout(debounceRef.current);
                      limparEndereco();
                    }}
                    disabled={loading && cepSomenteNumeros.length === 8}
                  >
                    Limpar
                  </Button>
                  <Button type="button" onClick={copiarResultado} disabled={!temResultado}>
                    Copiar
                  </Button>
                </ActionsRow>
                <Hint id="cep-hint">
                  CEP atual: <strong>{cepFormatado || "—"}</strong>
                </Hint>
                <StatusMessage id="cep-status" role="status" aria-live="polite">
                  {status || ""}
                </StatusMessage>

                {historico.length > 0 ? (
                  <HistoryWrap>
                    <HistoryTitle>
                      <span>Buscas recentes</span>
                      <LinkButton type="button" onClick={limparHistorico}>
                        apagar
                      </LinkButton>
                    </HistoryTitle>
                    <HistoryChips>
                      {historico.map((cep) => {
                        const masked = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
                        return (
                          <Chip
                            key={cep}
                            type="button"
                            onClick={() => {
                              setCepDigitado(masked);
                              setStatus("");
                              buscarCep(cep);
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              removerDoHistorico(cep);
                            }}
                            title="Clique para buscar. Botão direito para remover do histórico."
                          >
                            {masked}
                          </Chip>
                        );
                      })}
                    </HistoryChips>
                  </HistoryWrap>
                ) : null}
              </InputRow>
            </HeaderText>
          </Header>
        </Card>

        <Card>
          <ResultsTitle>Resultado</ResultsTitle>

          {!temResultado ? (
            <EmptyState>
              Preencha o campo acima com um CEP de 8 dígitos para ver o endereço.
            </EmptyState>
          ) : (
            <ResultsGrid>
              <ResultItem>
                <ResultLabel>CEP</ResultLabel>
                <ResultValue>{cepFormatado || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>Rua</ResultLabel>
                <ResultValue>{endereco.rua || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>Bairro</ResultLabel>
                <ResultValue>{endereco.bairro || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>Cidade</ResultLabel>
                <ResultValue>{endereco.cidade || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>UF</ResultLabel>
                <ResultValue>{endereco.estado || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>DDD</ResultLabel>
                <ResultValue>{endereco.ddd || "—"}</ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>IBGE</ResultLabel>
                <ResultValue>{endereco.ibge || "—"}</ResultValue>
              </ResultItem>
            </ResultsGrid>
          )}
        </Card>
      </Container>
    </Page>
  );
}

export default App;
