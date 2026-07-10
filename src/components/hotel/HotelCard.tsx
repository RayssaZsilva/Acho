import "./HotelCard.css";
import { useNavigate } from "react-router-dom";

type HotelCardProps = {
  nome: string;
  id: number;
  cidade: string;
  imagem: string;
  avaliacao: number;
  preco: number;
  checkin?: string;
  checkout?: string;
};

function HotelCard({
  id,
  nome,
  cidade,
  imagem,
  avaliacao,
  preco,
  checkin,
  checkout,
}: HotelCardProps) {
  const navigate = useNavigate();

  function verDetalhes() {
    const logado = localStorage.getItem("isLogged");

    if (logado !== "true") {
      navigate("/.login");
      return;
    }
      if (checkin && checkout) {
        const params = new URLSearchParams({
          checkin,
          checkout,
        });
        navigate(`/hotel/${id}?${params.toString()}`);
  } else {
    navigate(`/hotel/${id}`);
  }
      }
  return (
    <div className="hotel-card">
      <img src={imagem} alt={nome} />

      <h3>{nome}</h3>

      <p>{cidade}</p>

      <p>★ {avaliacao}</p>

      <p>
        R$ {Number(preco).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>

      <button type="button" onClick={verDetalhes}>
        Ver detalhes
      </button>
    </div>
  );
}

export default HotelCard;