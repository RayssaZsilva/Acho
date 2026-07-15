import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const logado = localStorage.getItem("isLogged") === "true";

  function sair() {
    localStorage.removeItem("isLogged");
    navigate("/");
  }

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-name">Achô</span>
        <span className="brand-tagline">
          Achou. Gostou. Reservou.
        </span>
      </Link>

      <nav className="site-nav">
        <Link to="/">Explorar</Link>
        <Link to="/favoritos">Favoritos</Link>

        {logado ? (
          <>
            <Link to="/perfil">Perfil</Link>

            <button type="button" onClick={sair}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;