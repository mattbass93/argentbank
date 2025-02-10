
// import '../assets/css/main.css'; // Import du CSS
import argentBankLogo from "../assets/img/argentBankLogo.png"
import chatIcon from "../assets/img/icon-chat.png"
import moneyIcon from "../assets/img/icon-money.png"
import securityIcon from "../assets/img/icon-security.png"


const Home = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
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
      <main>
        {/* Hero Section */}
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>

        {/* Features Section */}
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <div className="feature-item">
            <img
              src={chatIcon}
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="feature-item">
            <img
              src={moneyIcon}
              alt="Money Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="feature-item">
            <img
              src={securityIcon}
              alt="Security Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Home;
