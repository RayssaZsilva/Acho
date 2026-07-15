import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ultimaPesquisa, setUltimaPesquisa] =
    useState("Nenhuma pesquisa realizada");
  const [contaCriada, setContaCriada] =
    useState("Data não disponível");
  const [quantidadeFavoritos, setQuantidadeFavoritos] =
    useState(0);

  useEffect(() => {
    const logado =
      localStorage.getItem("isLogged") === "true";

    if (!logado) {
      navigate("/login");
      return;
    }

    const nomeSalvo =
      localStorage.getItem("userName") ||
      "Usuário Achô";

    const emailSalvo =
      localStorage.getItem("userEmail") ||
      "E-mail não informado";

    const pesquisaSalva =
      localStorage.getItem("lastSearch") ||
      "Nenhuma pesquisa realizada";

    const dataSalva =
      localStorage.getItem("createdAt");

    const favoritosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    setNome(nomeSalvo);
    setEmail(emailSalvo);
    setUltimaPesquisa(pesquisaSalva);

    setQuantidadeFavoritos(
      Array.isArray(favoritosSalvos)
        ? favoritosSalvos.length
        : 0
    );

    if (dataSalva) {
      const dataFormatada = new Date(
        dataSalva
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      setContaCriada(dataFormatada);
    }
  }, [navigate]);

  function sair() {
    localStorage.removeItem("isLogged");
    navigate("/");
  }

  return (
    <main className="perfil-page">
      <section className="perfil-card">
        <div className="perfil-avatar">
          {nome.charAt(0).toUpperCase()}
        </div>

        <div className="perfil-info">
          <span>Minha conta</span>

          <h1>{nome}</h1>

          <p>{email}</p>
        </div>
      </section>

      <section className="perfil-resumo">
        <article>
          <span>❤️</span>

          <div>
            <strong>{quantidadeFavoritos}</strong>
            <p>hotéis favoritos</p>
          </div>
        </article>

        <article>
          <span>🔎</span>

          <div>
            <strong>{ultimaPesquisa}</strong>
            <p>última cidade pesquisada</p>
          </div>
        </article>

        <article>
          <span>📅</span>

          <div>
            <strong>{contaCriada}</strong>
            <p>conta criada em</p>
          </div>
        </article>
      </section>

      <section className="perfil-acoes">
        <button
          type="button"
          onClick={() => navigate("/favoritos")}
        >
          Ver meus favoritos
        </button>

        <button
          type="button"
          className="perfil-sair"
          onClick={sair}
        >
          Sair da conta
        </button>
      </section>
    </main>
  );
}

export default Perfil;