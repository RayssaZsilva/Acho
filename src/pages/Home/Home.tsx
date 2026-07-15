import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import HotelCard from "../../components/hotel/HotelCard";

import {
  buscarHoteis,
  buscarMaisAvaliados,
  buscarPromocoes,
  type HotelLocal,
} from "../../services/HotelServiceLocal";

import "./Home.css";

function Home() {
  const [hotels, setHotels] = useState<HotelLocal[]>([]);
  const [maisAvaliados, setMaisAvaliados] = useState<HotelLocal[]>([]);
  const [promocoes, setPromocoes] = useState<HotelLocal[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState("São Paulo");
  const [checkinAtual, setCheckinAtual] = useState("");
  const [checkoutAtual, setCheckoutAtual] = useState("");

  const carregouInicial = useRef(false);

  function formatarData(data: Date) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  async function pesquisarCidade(
    nomeCidade: string,
    checkin: string,
    checkout: string,
    _adultos: number,
    _criancas: number,
    _quartos: number
  ) {
    try {
      setCarregando(true);
      setErro("");

      const cidadePesquisada = nomeCidade.trim();
      const resultados = await buscarHoteis(cidadePesquisada);
      localStorage.setItem("lastSearch", cidadePesquisada);

      setHotels(resultados);

      setCidadeAtual(
        resultados.length > 0
          ? resultados[0].cidade
          : cidadePesquisada

      );

      setCheckinAtual(checkin);
      setCheckoutAtual(checkout);

      if (resultados.length === 0) {
        setErro(
          `Nenhum hotel foi encontrado em ${cidadePesquisada}.`
        );
      }
    } catch (error) {
      console.error("Erro ao pesquisar hotéis:", error);

      setHotels([]);
      setErro("Não foi possível pesquisar os hotéis.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (carregouInicial.current) return;

    carregouInicial.current = true;

    async function carregarPaginaInicial() {
      try {
        setCarregando(true);
        setErro("");

        const hoje = new Date();

        const entrada = new Date(hoje);
        entrada.setDate(entrada.getDate() + 1);

        const saida = new Date(hoje);
        saida.setDate(saida.getDate() + 2);

        const checkinInicial = formatarData(entrada);
        const checkoutInicial = formatarData(saida);

        const [
          hoteisSaoPaulo,
          hoteisMaisAvaliados,
          hoteisPromocao,
        ] = await Promise.all([
          buscarHoteis("São Paulo"),
          buscarMaisAvaliados(),
          buscarPromocoes(),
        ]);

        setHotels(hoteisSaoPaulo);
        setMaisAvaliados(hoteisMaisAvaliados);
        setPromocoes(hoteisPromocao);

        setCidadeAtual("São Paulo");
        setCheckinAtual(checkinInicial);
        setCheckoutAtual(checkoutInicial);

        if (hoteisSaoPaulo.length === 0) {
          setErro("Nenhum hotel foi encontrado em São Paulo.");
        }
      } catch (error) {
        console.error("Erro ao carregar a página inicial:", error);

        setErro("Não foi possível carregar os hotéis iniciais.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPaginaInicial();
  }, []);

  function renderizarCard(hotel: HotelLocal) {
    return (
      <HotelCard
        key={hotel.id}
        id={hotel.id}
        nome={hotel.nome}
        cidade={`${hotel.cidade} - ${hotel.estado}`}
        imagem={hotel.imagem}
        avaliacao={hotel.avaliacao}
        preco={hotel.preco}
        checkin={checkinAtual}
        checkout={checkoutAtual}
      />
    );
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>Achou. Gostou. Reservou.</h1>

            <p>
              Compare hotéis, descubra o lugar ideal e planeje sua
              próxima viagem com praticidade.
            </p>

            <div className="home-search-wrapper">
              <SearchBar onBuscar={pesquisarCidade} />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="section-label">
              Destino selecionado
            </span>

            <h2>Hotéis em {cidadeAtual}</h2>
          </div>
        </div>

        {carregando && (
          <div className="home-status">
            Carregando hotéis...
          </div>
        )}

        {!carregando && erro && (
          <div className="home-status home-status-error">
            {erro}
          </div>
        )}

        {!carregando && !erro && hotels.length === 0 && (
          <div className="home-status">
            Nenhum hotel disponível.
          </div>
        )}

        <div className="hotel-list">
          {hotels.map(renderizarCard)}
        </div>
      </section>

      <section className="home-section home-section-soft">
        <div className="home-section-heading">
          <div>
            <span className="section-label">
              Experiências especiais
            </span>

            <h2>Mais bem avaliados</h2>
          </div>

          <p>
            Hospedagens com as melhores avaliações entre
            os nossos destinos.
          </p>
        </div>

        <div className="hotel-list">
          {maisAvaliados.map(renderizarCard)}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="section-label">
              Economize na viagem
            </span>

            <h2>Melhores preços</h2>
          </div>

          <p>
            Opções com ótimo custo-benefício para viajar
            sem gastar demais.
          </p>
        </div>

        <div className="hotel-list">
          {promocoes.map(renderizarCard)}
        </div>
      </section>

      <section className="home-benefits">
        <article>
          <span>🔍</span>

          <div>
            <h3>Busca simples</h3>

            <p>
              Encontre hotéis por cidade de forma rápida.
            </p>
          </div>
        </article>

        <article>
          <span>❤️</span>

          <div>
            <h3>Salve seus favoritos</h3>

            <p>
              Guarde as hospedagens que mais chamaram sua
              atenção.
            </p>
          </div>
        </article>

        <article>
          <span>🗺️</span>

          <div>
            <h3>Veja a localização</h3>

            <p>
              Confira cada hospedagem diretamente no mapa.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Home;