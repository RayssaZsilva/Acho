import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

type HotelCardProps = {
  id: number;
  nome: string;
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
    const estaLogado =
      localStorage.getItem("isLogged") === "true";

    if (!estaLogado) {
      const paramsRetorno = new URLSearchParams();

      paramsRetorno.set("redirect", `/hotel/${id}`);

      if (checkin) {
        paramsRetorno.set("checkin", checkin);
      }

      if (checkout) {
        paramsRetorno.set("checkout", checkout);
      }

      navigate(`/login?${paramsRetorno.toString()}`);
      return;
    }

    const params = new URLSearchParams();

    if (checkin) {
      params.set("checkin", checkin);
    }

    if (checkout) {
      params.set("checkout", checkout);
    }

    const query = params.toString();

    navigate(
      query
        ? `/hotel/${id}?${query}`
        : `/hotel/${id}`
    );
  }

  return (
    <article className="hotel-card">
      <img
        src={imagem}
        alt={nome}
        className="hotel-card-image"
      />

      <div className="hotel-card-content">
        <h3>{nome}</h3>

        <p>{cidade}</p>

        <p>⭐ {avaliacao}</p>

        <strong>
          {preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>

        <button
          type="button"
          onClick={verDetalhes}
        >
          Ver detalhes
        </button>
      </div>
    </article>
  );
}

export default HotelCard;