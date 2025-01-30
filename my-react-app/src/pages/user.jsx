import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";

const User = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token invalide ou expiré");
        }

        const data = await response.json();
        setUser(data.body);
      } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err);
        setError("Impossible de récupérer les informations utilisateur.");
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedFirstName(user.firstName);
    setEditedLastName(user.lastName);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:3001/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName: editedFirstName, lastName: editedLastName }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      const updatedData = await response.json();
      setUser(updatedData.body);
      setIsEditing(false);

      // Mise à jour du localStorage
      localStorage.setItem("user", JSON.stringify(updatedData.body));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil :", err);
      setError("Impossible de mettre à jour les informations.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/user">
            <i className="fa fa-user-circle"></i> {user.firstName}
          </a>
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main bg-dark">
  <div className="header">
    <h1>
      Welcome back
      <br />
      {isEditing ? (
        <div className="edit-inputs-container"> {/* 🔥 Ajout d'une div */}
          <input className="edit-input" type="text" value={editedFirstName} onChange={(e) => setEditedFirstName(e.target.value)} />
          <input className="edit-input" type="text" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />
        </div>
      ) : (
        `${user.firstName} ${user.lastName}`
      )}
    </h1>
    {isEditing ? (
      <div className="edit-buttons-container"> {/* 🔥 Ajout d'une div */}
        <button className="edit-button" onClick={handleSave}>Save</button>
        <button className="edit-button cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    ) : (
      <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
    )}
  </div>
  <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
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

export default User;

