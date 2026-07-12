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
  const [maisAvaliados, setMaisAvaliados] = useState<
    HotelLocal[]
  >([]);
  const [promocoes, setPromocoes] = useState<HotelLocal[]>(
    []
  );

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [cidadeAtual, setCidadeAtual] =
    useState("São Paulo");
  const [checkinAtual, setCheckinAtual] = useState("");
  const [checkoutAtual, setCheckoutAtual] = useState("");

  const carregouInicial = useRef(false);

  function formatarData(data: Date) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(
      2,
      "0"
    );
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

      const resultados = await buscarHoteis(nomeCidade);

      setHotels(resultados);
      setCidadeAtual(nomeCidade);
      setCheckinAtual(checkin);
      setCheckoutAtual(checkout);

      if (resultados.length === 0) {
        setErro(
          `Nenhum hotel foi encontrado em ${nomeCidade}.`
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
          setErro(
            "Nenhum hotel foi encontrado em São Paulo."
          );
        }
      } catch (error) {
        console.error(
          "Erro ao carregar a página inicial:",
          error
        );

        setErro(
          "Não foi possível carregar os hotéis iniciais."
        );
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
    <main>
      <section>
        <p>Olá!</p>

        <h1>Encontre sua próxima hospedagem.</h1>

        <p>
          Compare opções de hotéis para sua próxima
          viagem.
        </p>

        <SearchBar onBuscar={pesquisarCidade} />
      </section>

      <section>
        <h3>Hotéis em {cidadeAtual}</h3>

        {carregando && <p>Carregando hotéis...</p>}

        {!carregando && erro && <p>{erro}</p>}

        {!carregando &&
          !erro &&
          hotels.length === 0 && (
            <p>Nenhum hotel disponível.</p>
          )}

        <div className="hotel-list">
          {hotels.map(renderizarCard)}
        </div>
      </section>

      <section>
        <h3>Mais bem avaliados</h3>

        <div className="hotel-list">
          {maisAvaliados.map(renderizarCard)}
        </div>
      </section>

      <section>
        <h3>Melhores preços</h3>

        <div className="hotel-list">
          {promocoes.map(renderizarCard)}
        </div>
      </section>
    </main>
  );
}

export default Home;