import "./HotelCard.css";

type HotelCardProps = {
  nome: string;
  cidade: string;
  imagem: string;
  avaliacao: number;
  preco: number;
};

function HotelCard({
  nome,
  cidade,
  imagem,
  avaliacao,
  preco,
  }: 

HotelCardProps) {
  return (
    <div className="hotel-card">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>{cidade}</p>
      <p>★ {avaliacao}</p>
      <p>R$ {preco}</p>
    </div>
  );
}

export default HotelCard;