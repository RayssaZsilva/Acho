import "./HotelCard.css";
import { useNavigate } from "react-router-dom";

type HotelCardProps = {
  nome: string;
  id: number;
  cidade: string;
  imagem: string;
  avaliacao: number;
  preco: number;
};

function HotelCard({
  id,
  nome,
  cidade,
  imagem,
  avaliacao,
  preco,
  }: 

HotelCardProps) {
  const navigate = useNavigate();

    function verDetalhes() {
     
      const logado = localStorage.getItem("isLogged");

      if (logado === "true"){
        navigate(`/hotel/${id}`);
        } else {
          navigate("/login");
        }
    }

  return (
    <div className="hotel-card">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>{cidade}</p>
      <p>★ {avaliacao}</p>
      <p>R$ {preco}</p>
        <button onClick={verDetalhes}>
          Ver detalhes
        </button>
    </div>
  );
}

export default HotelCard;