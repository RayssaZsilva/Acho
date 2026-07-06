import "./header.css"
import { Link, useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    const logado = localStorage.getItem("isLogged") === "true";
    function sair() {
    localStorage.removeItem("isLogged");
    navigate("/");
}
    return(
        <header> 
            <h1>StayFinder</h1>
            
            <nav>
                <Link to="/">Explorar</Link>
                <Link to="/favoritos">Favoritos</Link>

                {logado ? (
                    <button onClick={sair}>Sair</button>
                ) : (
                    <Link to="/login">Entrar</Link>
                )}
                
                </nav>
            
        </header>
    );

}
export default Header;