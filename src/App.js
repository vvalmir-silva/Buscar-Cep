import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
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
  position: relative;
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
  &[data-success="true"] {
    color: #10b981;
    font-weight: 500;
  }
  &[data-error="true"] {
    color: #ef4444;
    font-weight: 500;
  }
`;

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const AutocompleteDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(79, 70, 229, 0.3);
  border-radius: 12px;
  margin-top: 6px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 9999;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
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

const toastIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastRegion = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  width: min(420px, calc(100vw - 32px));
  display: grid;
  gap: 10px;
`;

const Toast = styled.div`
  border-radius: 14px;
  padding: 12px 14px;
  border: 1px solid
    ${(props) => {
      if (props.$variant === "success") return "rgba(34, 197, 94, 0.35)";
      if (props.$variant === "warn") return "rgba(234, 179, 8, 0.38)";
      return "rgba(239, 68, 68, 0.40)";
    }};
  background: ${(props) => {
    if (props.$variant === "success") {
      return "linear-gradient(180deg, rgba(34, 197, 94, 0.16), rgba(34, 197, 94, 0.08))";
    }
    if (props.$variant === "warn") {
      return "linear-gradient(180deg, rgba(234, 179, 8, 0.18), rgba(234, 179, 8, 0.08))";
    }
    return "linear-gradient(180deg, rgba(239, 68, 68, 0.16), rgba(239, 68, 68, 0.08))";
  }};
  color: rgba(227, 232, 240, 0.98);
  box-shadow: ${(props) =>
    props.$shadow === "strong"
      ? "0 24px 70px rgba(2, 6, 23, 0.74)"
      : "0 16px 44px rgba(2, 6, 23, 0.55)"};
  backdrop-filter: blur(10px);
  animation: ${toastIn} 160ms ease-out;
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const ToastClose = styled.button`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(227, 232, 240, 0.92);
  width: 28px;
  height: 28px;
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-weight: 900;
  line-height: 1;
  padding: 0;
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.22);
  }
`;

const ToastTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  letter-spacing: -0.01em;
`;

const ToastText = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: rgba(227, 232, 240, 0.88);
  line-height: 1.35;
`;

function App() {
  const [endereco, setEndereco] = useState({});
  const [cepDigitado, setCepDigitado] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [historico, setHistorico] = useState([]);
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    variant: "error",
    shadow: "strong",
  });
  const [coords, setCoords] = useState(null);
  const [enderecoDigitado, setEnderecoDigitado] = useState("");
  const [sugestoesEndereco, setSugestoesEndereco] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const debounceRef = useRef(null);
  const controllerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const geoControllerRef = useRef(null);

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

  const buscarEnderecos = useCallback(
    async (endereco) => {
      if (endereco.length < 3) {
        setSugestoesEndereco([]);
        setMostrarSugestoes(false);
        return;
      }
      
      try {
        // Lista de estados brasileiros para busca
        const estados = ['SP', 'RJ', 'MG', 'BA', 'RS', 'PR', 'SC', 'GO', 'DF', 'MT', 'MS', 'PE', 'CE', 'PA', 'AM', 'ES', 'MA', 'RN', 'PB', 'AL', 'SE', 'TO', 'RO', 'AC', 'RR', 'AP'];
        
        // Para cada estado, tentar buscar em cidades principais
        const cidadesPrincipais = {
          'SP': ['São Paulo', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Guarulhos', 'Osasco', 'Sorocaba', 'Campinas'],
          'RJ': ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Petrópolis'],
          'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Betim', 'Juiz de Fora'],
          'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
          'RS': ['Porto Alegre', 'Caxias do Sul', 'Gravataí', 'Canoas'],
          'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
          'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
          'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
          'DF': ['Brasília'],
          'MT': ['Cuiabá', 'Várzea Grande'],
          'MS': ['Campo Grande', 'Três Lagoas'],
          'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
          'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
          'PA': ['Belém', 'Ananindeua'],
          'AM': ['Manaus'],
          'ES': ['Vitória', 'Vila Velha', 'Serra'],
          'MA': ['São Luís'],
          'RN': ['Natal'],
          'PB': ['João Pessoa', 'Campina Grande'],
          'AL': ['Maceió'],
          'SE': ['Aracaju'],
          'TO': ['Palmas'],
          'RO': ['Porto Velho'],
          'AC': ['Rio Branco'],
          'RR': ['Boa Vista'],
          'AP': ['Macapá']
        };
        
        const resultados = [];
        
        // Buscar em cada estado/cidade principal
        for (const estado of estados.slice(0, 5)) { // Limitar para 5 estados para não sobrecarregar
          const cidades = cidadesPrincipais[estado] || [];
          
          for (const cidade of cidades.slice(0, 3)) { // Limitar para 3 cidades por estado
            try {
              const url = `https://viacep.com.br/ws/${encodeURIComponent(estado)}/${encodeURIComponent(cidade)}/${encodeURIComponent(endereco)}/json/`;
              const response = await fetch(url);
              
              if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                  // Adicionar resultados que contêm o termo buscado
                  const resultadosFiltrados = data.filter(item => 
                    item.logradouro?.toLowerCase().includes(endereco.toLowerCase()) ||
                    item.bairro?.toLowerCase().includes(endereco.toLowerCase())
                  );
                  
                  resultados.push(...resultadosFiltrados.map(item => ({
                    ...item,
                    rua: item.logradouro,
                    bairro: item.bairro,
                    cidade: item.localidade,
                    estado: item.uf,
                    logradouro: item.logradouro,
                    localidade: item.localidade,
                    uf: item.uf
                  })));
                }
              }
            } catch (error) {
              console.error('Erro na busca:', error);
              // Continuar para próxima cidade se houver erro
              continue;
            }
            
            // Se já encontrou resultados suficientes, parar
            if (resultados.length >= 5) break;
          }
          
          if (resultados.length >= 5) break;
        }
        
        // Remover duplicatas e limitar a 5 resultados
        const resultadosUnicos = resultados.filter((item, index, self) =>
          index === self.findIndex((t) => t.cep === item.cep)
        ).slice(0, 5);
        
        setSugestoesEndereco(resultadosUnicos);
        setMostrarSugestoes(true);
      } catch (error) {
        console.error('Erro na busca de endereço:', error);
        setSugestoesEndereco([]);
        setMostrarSugestoes(false);
      }
    },
    []
  );

  const selecionarEndereco = useCallback((enderecoSelecionado) => {
    setCepDigitado(enderecoSelecionado.cep || "");
    setEnderecoDigitado("");
    setMostrarSugestoes(false);
    setSugestoesEndereco([]);
    
    const enderecoFormatado = {
      cep: enderecoSelecionado.cep,
      rua: enderecoSelecionado.logradouro || enderecoSelecionado.street,
      bairro: enderecoSelecionado.bairro || enderecoSelecionado.neighborhood,
      cidade: enderecoSelecionado.localidade || enderecoSelecionado.city,
      estado: enderecoSelecionado.uf || enderecoSelecionado.state,
      regiao: enderecoSelecionado.regiao || "",
      ibge: enderecoSelecionado.ibge,
      ddd: enderecoSelecionado.ddd,
    };
    
    setEndereco(enderecoFormatado);
    
    setStatus({ text: "Endereço carregado com sucesso.", success: true });
    if (enderecoSelecionado.cep) {
      salvarHistorico(enderecoSelecionado.cep);
    }
    
    if (geoControllerRef.current) {
      geoControllerRef.current.abort();
    }
    const geoController = new AbortController();
    geoControllerRef.current = geoController;
    setCoords(null);

    const enderecoTexto = [
      enderecoSelecionado.logradouro || enderecoSelecionado.street,
      enderecoSelecionado.bairro || enderecoSelecionado.neighborhood,
      enderecoSelecionado.localidade || enderecoSelecionado.city,
      enderecoSelecionado.uf || enderecoSelecionado.state,
      "Brasil",
    ]
      .filter(Boolean)
      .join(", ");

    fetch(
      `https://geocode.maps.co/search?q=${encodeURIComponent(enderecoTexto)}`,
      { signal: geoController.signal }
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((arr) => {
        const first = Array.isArray(arr) ? arr[0] : null;
        const lat = first?.lat ? Number(first.lat) : null;
        const lon = first?.lon ? Number(first.lon) : null;
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          setCoords({ lat, lon });
        }
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
      });
  }, [salvarHistorico]);

  const limparEndereco = useCallback(() => {
    setEndereco({});
    setCoords(null);
    if (geoControllerRef.current) {
      geoControllerRef.current.abort();
    }
  }, []);

  const fecharToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const mostrarToast = useCallback((
    title,
    message,
    variant = "error",
    shadow = "strong"
  ) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ visible: true, title, message, variant, shadow });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function atualizarCep(event) {
    const value = event.target.value;
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const masked = digits.replace(/(\d{5})(\d{0,3})/, (m, p1, p2) =>
      p2 ? `${p1}-${p2}` : p1
    );

    setCepDigitado(masked);
    setStatus("");
    setEnderecoDigitado("");
    setMostrarSugestoes(false);

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

  function atualizarEndereco(event) {
    const value = event.target.value;
    setEnderecoDigitado(value);
    setCepDigitado("");
    setStatus("");
    limparEndereco();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length >= 3) {
      debounceRef.current = setTimeout(() => {
        buscarEnderecos(value);
      }, 500);
    } else {
      setSugestoesEndereco([]);
      setMostrarSugestoes(false);
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
            setStatus({ text: "CEP não encontrado.", error: true });
            setLoading(false);
            mostrarToast(
              "CEP não encontrado",
              "Verifique se você digitou corretamente e tente novamente.",
              "error"
            );
            return;
          }

          if (geoControllerRef.current) {
            geoControllerRef.current.abort();
          }
          const geoController = new AbortController();
          geoControllerRef.current = geoController;
          setCoords(null);

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

          const enderecoTexto = [
            dados.logradouro,
            dados.bairro,
            dados.localidade,
            dados.uf,
            "Brasil",
          ]
            .filter(Boolean)
            .join(", ");

          fetch(
            `https://geocode.maps.co/search?q=${encodeURIComponent(
              enderecoTexto
            )}`,
            { signal: geoController.signal }
          )
            .then((r) => (r.ok ? r.json() : []))
            .then((arr) => {
              const first = Array.isArray(arr) ? arr[0] : null;
              const lat = first?.lat ? Number(first.lat) : null;
              const lon = first?.lon ? Number(first.lon) : null;
              if (Number.isFinite(lat) && Number.isFinite(lon)) {
                setCoords({ lat, lon });
              }
            })
            .catch((err) => {
              if (err?.name === "AbortError") return;
            });

          salvarHistorico(cep);
          setStatus({ text: "Endereço carregado com sucesso.", success: true });
          setLoading(false);
        })
        .catch((err) => {
          if (err?.name === "AbortError") {
            return;
          }
          limparEndereco();
          setStatus("Não foi possível buscar o CEP. Verifique sua conexão.");
          setLoading(false);
          mostrarToast(
            "Falha na busca",
            "Não foi possível consultar o CEP agora. Tente novamente em alguns instantes.",
            "error"
          );
        });
    },
    [cepSomenteNumeros, limparEndereco, mostrarToast, salvarHistorico]
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (mostrarSugestoes && !event.target.closest('.autocomplete-container')) {
        setMostrarSugestoes(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mostrarSugestoes]);

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
      coords?.lat && coords?.lon
        ? `Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
        : "",
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
      {toast.visible ? (
        <ToastRegion aria-live="polite" aria-atomic="true">
          <Toast $variant={toast.variant} $shadow={toast.shadow} role="status">
            <ToastHeader>
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastClose type="button" onClick={fecharToast} aria-label="Fechar">
                ×
              </ToastClose>
            </ToastHeader>
            <ToastText>{toast.message}</ToastText>
          </Toast>
        </ToastRegion>
      ) : null}
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
                  Digite um CEP válido ou um endereço (rua, bairro, cidade). 
                  Ao completar 8 dígitos do CEP ou digitar 3+ caracteres do endereço,
                  os dados são buscados automaticamente.
                </Subtitle>
              </div>

              <InputRow>
                <AutocompleteContainer className="autocomplete-container">
                <VisuallyHiddenLabel htmlFor="cep-input">
                  Digite o CEP ou endereço
                </VisuallyHiddenLabel>
                <HeaderInput
                  id="cep-input"
                  value={cepDigitado || enderecoDigitado}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Verificar se é um CEP (formato XXXXX-XXX ou XXXXXXXX)
                    const apenasNumeros = value.replace(/\D/g, '');
                    const cepPattern = /^\d{5}-?\d{0,3}$/;
                    if (apenasNumeros.length >= 8 && cepPattern.test(value)) {
                      atualizarCep(e);
                    } else {
                      atualizarEndereco(e);
                    }
                  }}
                  onKeyDown={onKeyDownInput}
                  placeholder="CEP ou endereço (ex: Paulista, São Paulo)"
                  inputMode="text"
                  maxLength={100}
                  aria-describedby="cep-hint cep-status"
                />
                {mostrarSugestoes && (
                  <AutocompleteDropdown>
                    {sugestoesEndereco.length > 0 ? (
                      sugestoesEndereco.map((endereco, index) => (
                        <div
                          key={`${endereco.cep || 'sem-cep'}-${index}`}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            background: 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            color: 'rgba(227, 232, 240, 0.95)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            borderBottom: '1px solid rgba(79, 70, 229, 0.1)',
                            boxSizing: 'border-box',
                            display: 'block',
                            whiteSpace: 'normal',
                            lineHeight: '1.4'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(79, 70, 229, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                          }}
                          onMouseDown={() => {
                            if (endereco.cep) {
                              selecionarEndereco(endereco);
                            } else {
                              // Se não tiver CEP, ainda assim preencher os dados disponíveis
                              setEndereco({
                                cep: '',
                                rua: endereco.logradouro || endereco.street,
                                bairro: endereco.bairro || endereco.neighborhood,
                                cidade: endereco.localidade || endereco.city,
                                estado: endereco.uf || endereco.state,
                                regiao: endereco.regiao || "",
                                ibge: endereco.ibge,
                                ddd: endereco.ddd,
                              });
                              setCepDigitado("");
                              setEnderecoDigitado("");
                              setMostrarSugestoes(false);
                              setSugestoesEndereco([]);
                              setStatus({ text: "Endereço carregado (sem CEP disponível).", success: true });
                            }
                          }}
                          title={endereco.cep ? "Clique para carregar este endereço" : "Endereço sem CEP - clique para ver detalhes"}
                        >
                          {endereco.cep ? (
                            <>
                              <strong>{endereco.cep}</strong> - {[
                                endereco.logradouro || endereco.street,
                                endereco.bairro || endereco.neighborhood,
                                endereco.cidade || endereco.city,
                                endereco.estado || endereco.state
                              ].filter(Boolean).join(', ')}
                            </>
                          ) : (
                            <>
                              {[
                                endereco.logradouro || endereco.street,
                                endereco.bairro || endereco.neighborhood,
                                endereco.cidade || endereco.city,
                                endereco.estado || endereco.state
                              ].filter(Boolean).join(', ')}
                              <small style={{opacity: 0.7, marginLeft: '8px'}}>(Sem CEP)</small>
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          color: 'rgba(227, 232, 240, 0.6)',
                          fontSize: '14px',
                          cursor: 'not-allowed',
                          boxSizing: 'border-box',
                          display: 'block',
                          whiteSpace: 'normal',
                          lineHeight: '1.4'
                        }}
                      >
                        Nenhum endereço encontrado
                      </div>
                    )}
                    </AutocompleteDropdown>
                )}
              </AutocompleteContainer>
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
                  {temResultado && (
                    <PrimaryButton
                      as="a"
                      href={
                        coords?.lat && coords?.lon
                          ? `https://www.google.com/maps?q=${coords.lat},${coords.lon}`
                          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              [
                                endereco.rua,
                                endereco.bairro,
                                endereco.cidade,
                                endereco.estado,
                                "Brasil",
                              ]
                                .filter(Boolean)
                                .join(", ")
                          )}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir no Google Maps
                    </PrimaryButton>
                  )}
                </ActionsRow>
                <Hint id="cep-hint">
                  CEP/Endereço atual: <strong>{cepFormatado || enderecoDigitado || "—"}</strong>
                </Hint>
                <StatusMessage 
                  id="cep-status" 
                  role="status" 
                  aria-live="polite"
                  data-success={typeof status === 'object' ? status.success : false}
                  data-error={typeof status === 'object' ? status.error : false}
                >
                  {typeof status === 'object' ? status.text : status || ""}
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
                <ResultValue>
                  {endereco.cep ? endereco.cep.replace(/(\d{5})(\d{3})/, "$1-$2") : cepFormatado || "—"}
                </ResultValue>
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
