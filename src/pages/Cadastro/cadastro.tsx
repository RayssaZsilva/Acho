import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  function fazerCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = new FormData(event.currentTarget);

    const nome = String(formulario.get("nome") || "");
    const email = String(formulario.get("email") || "");
    const senha = String(formulario.get("senha") || "");
    const confirmarSenha = String(
      formulario.get("confirmarSenha") || ""
    );

    if (senha !== confirmarSenha) {
      alert("As senhas precisam ser iguais.");
      return;
    }

    localStorage.setItem("userName", nome);
    localStorage.setItem("userEmail", email);
    localStorage.se("createdAt", new Date( ) .toISOString())
    localStorage.setItem("isLogged", "true");

    navigate("/");
  }

  return (
    <main className="cadastro-page">
      <section className="cadastro-card">
        <div className="cadastro-brand">
          <span>Achô</span>
          <small>Achou. Gostou. Reservou.</small>
        </div>

        <div className="cadastro-heading">
          <span>Comece sua jornada</span>

          <h1>Crie sua conta</h1>

          <p>
            Cadastre-se para salvar hotéis, acessar seus favoritos e
            planejar sua próxima viagem.
          </p>
        </div>

        <form onSubmit={fazerCadastro}>
          <div className="cadastro-field">
            <label htmlFor="nome">Nome completo</label>

            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="cadastro-field">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="nome@email.com"
              required
            />
          </div>

          <div className="cadastro-field">
            <label htmlFor="senha">Senha</label>

            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Crie uma senha"
              minLength={6}
              required
            />
          </div>

          <div className="cadastro-field">
            <label htmlFor="confirmarSenha">
              Confirmar senha
            </label>

            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Digite a senha novamente"
              minLength={6}
              required
            />
          </div>

          <button type="submit">
            Criar conta
          </button>
        </form>

        <p className="cadastro-login">
          Já possui uma conta?{" "}
          <Link to="/login">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;