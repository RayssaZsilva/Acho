import { useEffect, useState } from "react";
import HotelCard from "../../components/hotel/HotelCard";

type HotelFavorito = {
  id: number;
  nome: string;
  cidade: string;
  imagem: string;
  avaliacao: number;
  preco: number;
  checkin?: string;
  checkout?: string;
};

function Favoritos() {
  const [favoritos, setFavoritos] = useState<
    HotelFavorito[]
  >([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    setFavoritos(
      Array.isArray(dadosSalvos)
        ? dadosSalvos
        : []
    );
  }, []);

  function removerFavorito(id: number) {
    const atualizados = favoritos.filter(
      (hotel) => hotel.id !== id
    );

    setFavoritos(atualizados);

    localStorage.setItem(
      "favoritos",
      JSON.stringify(atualizados)
    );
  }

  return (
    <main className="favoritos-page">
      <h1>Meus favoritos</h1>

      {favoritos.length === 0 ? (
        <p>
          Você ainda não salvou nenhum hotel.
        </p>
      ) : (
        <div className="hotel-list">
          {favoritos.map((hotel) => (
            <div
              className="favorite-card-wrapper"
              key={hotel.id}
            >
              <HotelCard
                id={hotel.id}
                nome={hotel.nome}
                cidade={hotel.cidade}
                imagem={hotel.imagem}
                avaliacao={hotel.avaliacao}
                preco={hotel.preco}
                checkin={hotel.checkin}
                checkout={hotel.checkout}
              />

              <button
                type="button"
                onClick={() =>
                  removerFavorito(hotel.id)
                }
              >
                Remover dos favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favoritos;