import { Provider } from "react-redux";
import store from "./utils/store";
import ReactDOM from 'react-dom/client';
import App from './App'; // Importez le composant principal
import './assets/css/main.css'; // Importez vos styles globaux

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);







