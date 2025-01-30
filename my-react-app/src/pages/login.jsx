import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import argentBankLogo from "../assets/img/argentBankLogo.png";
import API_BASE_URL from '../config/apiconfiguration';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Permet la redirection

  

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    console.log("Tentative de connexion à :", API_BASE_URL); // Debug URL
    const response = await fetch(API_BASE_URL + '/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": email, "password": password }),
    });

    console.log("Réponse brute :", response); // Vérifie si la réponse est bien reçue

    const data = await response.json();
    console.log("Données reçues :", data); // Affiche le token récupéré

    if (!response.ok) {
      throw new Error(data.message || "Échec de la connexion");
    }

    localStorage.setItem("authToken", data.body.token);

    navigate("/user");
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    setError(err.message);
  }
};

  

  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Login;
