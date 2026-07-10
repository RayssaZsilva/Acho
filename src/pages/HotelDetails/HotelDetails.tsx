import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  buscarDetalhesHotel,
  buscarFotosHotel,
} from "../../services/hotelService";

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

  const [hotel, setHotel] = useState<any>(null);
  const [fotos, setFotos] = useState<any[]>([]);
  const [favoritado, setFavoritado] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarHotel() {
      if (!id || !checkin || !checkout) {
        setErro("As datas da reserva não foram informadas.");
        return;
      }

      try {
        setErro("");

        const dados = await buscarDetalhesHotel(
          id,
          checkin,
          checkout
        );

        const fotosHotel = await buscarFotosHotel(id);

        setHotel(dados);
        setFotos(fotosHotel);

        const favoritosSalvos = JSON.parse(
          localStorage.getItem("favoritos") || "[]"
        );

        const jaExiste = favoritosSalvos.some(
          (item: any) => item.id === dados.hotel_id
        );

        setFavoritado(jaExiste);
      } catch (error) {
        console.error("Erro ao carregar hotel:", error);
        setErro("Não foi possível carregar os detalhes do hotel.");
      }
    }

    carregarHotel();
  }, [id, checkin, checkout]);

  function pegarUrlFoto(foto: any) {
    return (
      foto?.url_original ||
      foto?.url_1440 ||
      foto?.url_max750 ||
      foto?.url_max500 ||
      foto?.url_max300 ||
      foto?.url_square60 ||
      ""
    );
  }

  function formatarData(data: string | null) {
    if (!data) {
      return "Data não informada";
    }

    return new Date(`${data}T12:00:00`).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  function salvarFavorito() {
    if (!hotel) return;

    const favoritosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    const jaExiste = favoritosSalvos.some(
      (item: any) => item.id === hotel.hotel_id
    );

    if (jaExiste) {
      const atualizados = favoritosSalvos.filter(
        (item: any) => item.id !== hotel.hotel_id
      );

      localStorage.setItem(
        "favoritos",
        JSON.stringify(atualizados)
      );

      setFavoritado(false);
      return;
    }

    const novoFavorito = {
      id: hotel.hotel_id,
      nome: hotel.hotel_name,
      cidade: hotel.city_trans || hotel.city,
      imagem: pegarUrlFoto(fotos[0]),
      avaliacao:
        hotel.review_score ??
        hotel.breakfast_review_score?.rating ??
        0,
      preco:
        hotel.composite_price_breakdown?.gross_amount_per_night
          ?.value ?? 0,
      url: hotel.url,
      checkin,
      checkout,
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

  return (
    <main className="hotel-details-page">
      <section className="hotel-details-header">
        <div>
          <span className="hotel-type">
            {hotel.accommodation_type_name || "Hospedagem"}
          </span>

          <h1>{hotel.hotel_name}</h1>

          <p className="hotel-address">
            📍 {hotel.hotel_address_line}
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
          {pegarUrlFoto(fotos[0]) ? (
            <img
              src={pegarUrlFoto(fotos[0])}
              alt={hotel.hotel_name}
            />
          ) : (
            <span>Foto principal do hotel</span>
          )}
        </div>

        <div className="gallery-small">
          <div>
            {pegarUrlFoto(fotos[1]) ? (
              <img
                src={pegarUrlFoto(fotos[1])}
                alt={`${hotel.hotel_name} 2`}
              />
            ) : (
              <span>Foto</span>
            )}
          </div>

          <div>
            {pegarUrlFoto(fotos[2]) ? (
              <img
                src={pegarUrlFoto(fotos[2])}
                alt={`${hotel.hotel_name} 3`}
              />
            ) : (
              <span>Foto</span>
            )}
          </div>
        </div>
      </section>

      <section className="hotel-content">
        <div className="hotel-info">
          <div className="info-card">
            <h2>Sobre esta hospedagem</h2>

            <p>
              Localizada em {hotel.city_trans || hotel.city},
              esta hospedagem oferece uma experiência confortável
              para sua viagem.
            </p>
          </div>

          <div className="info-card">
            <h2>Comodidades principais</h2>

            <ul className="facilities-list">
              {hotel.facilities_block?.facilities?.map(
                (
                  facility: { name: string },
                  index: number
                ) => (
                  <li key={`${facility.name}-${index}`}>
                    ✓ {facility.name}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="info-card">
            <h2>Avaliações</h2>

            <div className="reviews-grid">
              <div>
                <strong>{hotel.review_nr ?? 0}</strong>
                <span>avaliações</span>
              </div>

              <div>
                <strong>
                  {hotel.wifi_review_score?.rating ?? "—"}
                </strong>
                <span>Wi-Fi</span>
              </div>

              <div>
                <strong>
                  {hotel.breakfast_review_score?.rating ?? "—"}
                </strong>
                <span>café da manhã</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="booking-card">
          <span>Diária a partir de</span>

          <h2>
            {hotel.composite_price_breakdown
              ?.gross_amount_per_night?.value
              ? `${hotel.currency_code} ${hotel.composite_price_breakdown.gross_amount_per_night.value}`
              : "Consulte o preço"}
          </h2>

          <p>Datas selecionadas:</p>

          <strong>
            {formatarData(checkin)} até{" "}
            {formatarData(checkout)}
          </strong>

          <button type="button">
            Reservar agora
          </button>

          <small>
            Você não será cobrada nesta etapa.
          </small>
        </aside>
      </section>

      <section className="map-section">
        <h2>Localização</h2>

        <p className="map-address">
          📍 {hotel.hotel_address_line}
        </p>

        {hotel.latitude && hotel.longitude ? (
          <MapContainer
            center={[
              Number(hotel.latitude),
              Number(hotel.longitude),
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
                Number(hotel.latitude),
                Number(hotel.longitude),
              ]}
              icon={marcadorHotel}
            >
              <Popup>
                <strong>{hotel.hotel_name}</strong>
                <br />
                {hotel.hotel_address_line}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Localização não disponível.</p>
        )}
      </section>
    </main>
  );
}

export default HotelDetails;