import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  buscarHotelPorId,
  type HotelLocal,
} from "../../services/HotelServiceLocal";

import "./HotelDetails.css";

const marcadorHotel = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function HotelDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  const [hotel, setHotel] =
    useState<HotelLocal | null>(null);

  const [favoritado, setFavoritado] =
    useState(false);

  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarHotel() {
      if (!id) {
        setErro("Hotel não encontrado.");
        return;
      }

      try {
        setErro("");

        const dados = await buscarHotelPorId(
          Number(id)
        );

        if (!dados) {
          setErro("Hotel não encontrado.");
          return;
        }

        setHotel(dados);

        const favoritosSalvos = JSON.parse(
          localStorage.getItem("favoritos") || "[]"
        );

        const jaExiste = favoritosSalvos.some(
          (item: any) => item.id === dados.id
        );

        setFavoritado(jaExiste);
      } catch (error) {
        console.error(
          "Erro ao carregar hotel:",
          error
        );

        setErro(
          "Não foi possível carregar os detalhes."
        );
      }
    }

    carregarHotel();
  }, [id]);

  function formatarData(data: string | null) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(
      `${data}T12:00:00`
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function formatarPreco(preco: number) {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function salvarFavorito() {
    if (!hotel) return;

    const favoritosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    const jaExiste = favoritosSalvos.some(
      (item: any) => item.id === hotel.id
    );

    if (jaExiste) {
      const atualizados = favoritosSalvos.filter(
        (item: any) => item.id !== hotel.id
      );

      localStorage.setItem(
        "favoritos",
        JSON.stringify(atualizados)
      );

      setFavoritado(false);
      return;
    }

    const novoFavorito = {
      id: hotel.id,
      nome: hotel.nome,
      cidade: `${hotel.cidade} - ${hotel.estado}`,
      imagem: hotel.imagem,
      avaliacao: hotel.avaliacao,
      preco: hotel.preco,
      checkin: checkin ?? "",
      checkout: checkout ?? "",
    };

    localStorage.setItem(
      "favoritos",
      JSON.stringify([
        ...favoritosSalvos,
        novoFavorito,
      ])
    );

    setFavoritado(true);
  }

  if (erro) {
    return <h2>{erro}</h2>;
  }

  if (!hotel) {
    return <h2>Carregando...</h2>;
  }

  const fotoPrincipal =
    hotel.galeria?.[0] || hotel.imagem;

  const segundaFoto =
    hotel.galeria?.[1] || hotel.imagem;

  const terceiraFoto =
    hotel.galeria?.[2] || hotel.imagem;

  return (
    <main className="hotel-details-page">
      <section className="hotel-details-header">
        <div>
          <span className="hotel-type">
            Hospedagem
          </span>

          <h1>{hotel.nome}</h1>

          <p className="hotel-address">
            📍 {hotel.cidade} - {hotel.estado}
          </p>
        </div>

        <button
          type="button"
          className="favorite-button"
          onClick={salvarFavorito}
        >
          {favoritado ? "♥ Salvo" : "♡ Salvar"}
        </button>
      </section>

      <section className="hotel-gallery-placeholder">
        <div className="gallery-main">
          <img
            src={fotoPrincipal}
            alt={hotel.nome}
          />
        </div>

        <div className="gallery-small">
          <div>
            <img
              src={segundaFoto}
              alt={`${hotel.nome} 2`}
            />
          </div>

          <div>
            <img
              src={terceiraFoto}
              alt={`${hotel.nome} 3`}
            />
          </div>
        </div>
      </section>

      <section className="hotel-content">
        <div className="hotel-info">
          <div className="info-card">
            <h2>Sobre esta hospedagem</h2>

            <p>{hotel.descricao}</p>
          </div>

          <div className="info-card">
            <h2>Comodidades principais</h2>

            <ul className="facilities-list">
              {hotel.comodidades.map(
                (comodidade, index) => (
                  <li
                    key={`${comodidade}-${index}`}
                  >
                    ✓ {comodidade}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="info-card">
            <h2>Avaliações</h2>

            <div className="reviews-grid">
              <div>
                <strong>{hotel.avaliacao}</strong>
                <span>nota geral</span>
              </div>

              <div>
                <strong>
                  {hotel.avaliacao >= 9
                    ? "Excelente"
                    : "Muito bom"}
                </strong>
                <span>experiência</span>
              </div>

              <div>
                <strong>
                  {hotel.comodidades.length}
                </strong>
                <span>comodidades</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="booking-card">
          <span>Diária a partir de</span>

          <h2>{formatarPreco(hotel.preco)}</h2>

          <p>Datas selecionadas:</p>

          <strong>
            {formatarData(checkin)} até{" "}
            {formatarData(checkout)}
          </strong>

          <button type="button">
            Reservar agora
          </button>

          <small>
            Projeto demonstrativo. Nenhuma cobrança
            será realizada.
          </small>
        </aside>
      </section>

      <section className="map-section">
        <h2>Localização</h2>

        <p className="map-address">
          📍 {hotel.cidade} - {hotel.estado}
        </p>

        <MapContainer
          center={[
            hotel.latitude,
            hotel.longitude,
          ]}
          zoom={15}
          scrollWheelZoom={false}
          className="hotel-map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[
              hotel.latitude,
              hotel.longitude,
            ]}
            icon={marcadorHotel}
          >
            <Popup>
              <strong>{hotel.nome}</strong>
              <br />
              {hotel.cidade} - {hotel.estado}
            </Popup>
          </Marker>
        </MapContainer>
      </section>
    </main>
  );
}

export default HotelDetails;