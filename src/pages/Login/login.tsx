import type React from "react";
import "./login.css";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function fazerLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    localStorage.setItem("isLogged", "true");

    const redirect = searchParams.get("redirect");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    if (redirect) {
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
          ? `${redirect}?${query}`
          : redirect
      );

      return;
    }

    navigate("/");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span>Achô</span>
          <small>Achou. Gostou. Reservou.</small>
        </div>

        <div className="login-heading">
          <span>Bem-vinda de volta</span>
          <h1>Entre na sua conta</h1>

          <p>
            Acesse sua conta para continuar planejando sua
            próxima viagem.
          </p>
        </div>

        <form onSubmit={fazerLogin}>
          <div className="login-field">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              placeholder="nome@email.com"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="senha">Senha</label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit">
            Entrar
          </button>
        </form>

        <p className="login-register">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro">
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;