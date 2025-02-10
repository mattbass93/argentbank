import { Link } from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";

const NotFound = () => {
  return (
    <div className="not-found-container">
      {/* Navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="main bg-dark text-center">
        <h1 className="text-light mt-5">404 - Page Not Found</h1>
        <p className="text-light">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-3">Return to Home</Link>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default NotFound;
