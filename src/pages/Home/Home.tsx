import { useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import HotelCard from "../../components/hotel/HotelCard";
import {
  buscarHoteis,
  buscarLocal,
} from "../../services/hotelService";
import "./Home.css";

function Home() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState("São Paulo");
  const [checkinAtual, setCheckinAtual] = useState("");
  const [checkoutAtual, setCheckoutAtual] = useState("");

  async function pesquisarCidade(
  nomeCidade: string,
  checkin: string,
  checkout: string,
   adultos: number,
  criancas: number,
  quartos: number
) {
  try {
    setCarregando(true);
    setErro("");

    const locais = await buscarLocal(nomeCidade);

    const localEscolhido = locais.find(
      (local: any) => local.dest_type === "city"
    );

    if (!localEscolhido) {
      setHotels([]);
      setErro("Cidade não encontrada.");
      return;
    }

    const dados = await buscarHoteis(
      localEscolhido.dest_id,
      localEscolhido.dest_type,
      checkin,
      checkout,
       adultos,
       criancas,
       quartos
    );

    const resultados = Array.isArray(dados?.results)
      ? dados.results
      : [];

    setHotels(resultados);

    setCidadeAtual(
      localEscolhido.city_name ||
      localEscolhido.name ||
      nomeCidade
    );

    setCheckinAtual(checkin);
    setCheckoutAtual(checkout);

    if (resultados.length === 0) {
      setErro("Nenhum hotel foi encontrado.");
    }
  } catch (error) {
    console.error("Erro ao pesquisar hotéis:", error);

    setHotels([]);
    setErro("Não foi possível carregar os hotéis.");
  } finally {
    setCarregando(false);
  }
}

useEffect(() =>{
  pesquisarCidade(
    "São Paulo",
    "2026-07-18",
    "2026-07-20",
    2,
    0,
    1
  );
}, []);

  return (
    <main>
      <section>
        <p>Olá!</p>
        <h1>Encontre sua próxima hospedagem.</h1>
        <p>Compare os preços entre milhares de hotéis.</p>

        <SearchBar onBuscar={pesquisarCidade} />
      </section>

      <section>
        <h3>Hotéis em {cidadeAtual}</h3>

        {carregando && <p>Carregando hotéis...</p>}
        {erro && <p>{erro}</p>}

        <div className="hotel-list">
          {hotels
            .filter((hotel) => hotel?.id)
            .map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                nome={hotel.name || "Hotel sem nome"}
                cidade={
                  hotel.wishlistName ||
                  hotel.cityName ||
                  cidadeAtual
                }
                imagem={hotel.photoMainUrl || ""}
                avaliacao={hotel.reviewScore || 0}
                preco={
                  hotel.priceBreakdown?.grossPrice?.value || 0
                }
                checkin={checkinAtual}
                checkout={checkoutAtual}
              />
            ))}
        </div>
      </section>

      <section>
        <h3>Mais bem avaliados...</h3>
        <div>...</div>
      </section>

      <section>
        <h3>Promoções...</h3>
        <div>...</div>
      </section>
    </main>
  );
}

export default Home;