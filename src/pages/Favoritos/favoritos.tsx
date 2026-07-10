import { useEffect, useState } from "react";
import HotelCard from "../../components/hotel/HotelCard";

function Favoritos() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    setFavoritos(dados);
  }, []);

  return (
    <main style={{ padding: "30px" }}>
      <h1>❤️ Meus Favoritos</h1>

      {favoritos.length === 0 ? (
        <p>Você ainda não salvou nenhum hotel.</p>
      ) : (
        <div className="hotel-list">
          {favoritos.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              nome={hotel.nome}
              cidade={hotel.cidade}
              imagem={hotel.imagem}
              avaliacao={hotel.avaliacao}
              preco={hotel.preco}
              checkin={hotel.checkin}
             checkout={hotel.checkout}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favoritos;