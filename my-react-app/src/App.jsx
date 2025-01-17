import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; // Assurez-vous que ce fichier existe
import Home from './pages/home';
import User from './pages/user'
import './App.css'; // Importez vos styles CSS

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;



