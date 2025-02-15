import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEmail,
  setPassword,
  setRememberMe,
  setError,
} from "../utils/sliceuser";
import apiFetch from "../utils/api";
import argentBankLogo from "../assets/img/argentBankLogo.png";

const Login = () => {
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const rememberMe = useSelector((state) => state.user.rememberMe);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await apiFetch("/login", "POST", { email, password });
  
      localStorage.setItem("authToken", data.body.token);
  
      navigate("/user");
    } catch (err) {
      console.error("❌ Erreur lors de la connexion :", err);
      dispatch(setError(err.message));
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
          <a className="main-nav-item sign-in" href="/login">
            <i className="fa fa-user-circle sign-in-logo"></i>
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
                onChange={(e) => dispatch(setEmail(e.target.value))}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => dispatch(setRememberMe(e.target.checked))}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
