import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUser,
  logoutUser,
  setUser,
  startEditing,
  cancelEditing,
  updateEditedFields,
} from "../utils/sliceuser";
import apiFetch from "../utils/api";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import { useEffect } from "react";

const User = () => {
  const { user, isEditing, editedFirstName, editedLastName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        const data = await apiFetch("/profile", "GET", null, true);
        dispatch(setUser(data.body));
      } catch (err) {
        console.error("❌ Erreur lors de la récupération du profil :", err);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };
  
    if (!user) {
      fetchUserProfile();
    }
  }, [user, dispatch, navigate]);
  
  
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleEditClick = () => {
    dispatch(startEditing());
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  const handleSave = async () => {
    try {
      const updatedData = await apiFetch("/profile", "PUT", { firstName: editedFirstName, lastName: editedLastName }, true);
      dispatch(updateUser(updatedData.body));
      dispatch(cancelEditing());
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil :", err);
    }
  };

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
        <div className="main-nav-div">
          <a className="main-nav-item main-nav-firstname" href="/user">
            <i className="fa fa-user-circle"></i> {user.firstName}
          </a>
          <a className="main-nav-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sign Out
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {isEditing ? (
              <div className="edit-inputs-container">
                <input
                  className="edit-input"
                  type="text"
                  value={editedFirstName}
                  onChange={(e) =>
                    dispatch(updateEditedFields({ firstName: e.target.value, lastName: editedLastName }))
                  }
                />
                <input
                  className="edit-input"
                  type="text"
                  value={editedLastName}
                  onChange={(e) =>
                    dispatch(updateEditedFields({ firstName: editedFirstName, lastName: e.target.value }))
                  }
                />
              </div>
            ) : (
              `${user.firstName} ${user.lastName}`
            )}
          </h1>
          {isEditing ? (
            <div className="edit-buttons-container">
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
