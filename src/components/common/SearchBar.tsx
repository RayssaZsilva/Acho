import { useState } from "react";
import "../../components/common/searchBar.css";

type SearchBarProps = {
  onBuscar: (
    cidade: string,
    checkin: string,
    checkout: string,
    adultos: number,
    criancas: number,
    quartos: number
  ) => void;
};

function SearchBar({ onBuscar }: SearchBarProps) {
  const [cidade, setCidade] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adultos, setAdultos] = useState(2);
  const [criancas, setCriancas] = useState(0);
  const [quartos, setQuartos] = useState(1);

  function enviarBusca() {
    const cidadeLimpa = cidade.trim();

    if (!cidadeLimpa || !checkin || !checkout) {
      alert("Preencha a cidade, o check-in e o check-out.");
      return;
    }

    if (checkout <= checkin) {
      alert("O check-out precisa ser depois do check-in.");
      return;
    }

    onBuscar(
      cidadeLimpa,
      checkin,
      checkout,
      adultos,
      criancas,
      quartos
    );
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Para onde você vai?"
        value={cidade}
        onChange={(event) => setCidade(event.target.value)}
      />

      <input
        type="date"
        value={checkin}
        onChange={(event) => setCheckin(event.target.value)}
      />

      <input
        type="date"
        value={checkout}
        onChange={(event) => setCheckout(event.target.value)}
      />

      <input
        type="number"
        min="1"
        value={adultos}
        onChange={(event) => setAdultos(Number(event.target.value))}
        placeholder="Adultos"
      />

      <input
        type="number"
        min="0"
        value={criancas}
        onChange={(event) => setCriancas(Number(event.target.value))}
        placeholder="Crianças"
      />

      <input
        type="number"
        min="1"
        value={quartos}
        onChange={(event) => setQuartos(Number(event.target.value))}
        placeholder="Quartos"
      />

      <button type="button" onClick={enviarBusca}>
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;