
import argentBankLogo from "../assets/img/argentBankLogo.png"



const User = () => {
  const user = {
    firstName: 'Tony',
    lastName: 'Jarvis',
    accounts: [
      {
        type: 'Argent Bank Checking',
        number: 'x8349',
        balance: '$2,082.79',
        description: 'Available Balance',
      },
      {
        type: 'Argent Bank Savings',
        number: 'x6712',
        balance: '$10,928.42',
        description: 'Available Balance',
      },
      {
        type: 'Argent Bank Credit Card',
        number: 'x8349',
        balance: '$184.30',
        description: 'Current Balance',
      },
    ],
  };

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
          <a className="main-nav-item" href="/user">
            <i className="fa fa-user-circle"></i> {user.firstName}
          </a>
          <a className="main-nav-item" href="/">
            <i className="fa fa-sign-out"></i> Sign Out
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main bg-dark">
        {/* Header */}
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>

        {/* Accounts */}
        <h2 className="sr-only">Accounts</h2>
        {user.accounts.map((account, index) => (
          <section className="account" key={index}>
            <div className="account-content-wrapper">
              <h3 className="account-title">
                {account.type} ({account.number})
              </h3>
              <p className="account-amount">{account.balance}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default User;
