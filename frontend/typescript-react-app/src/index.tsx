import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

/**
 * @malatini
 * Fichier "racine" pour l'app frontend
 * Pour l'instant j'utilise useContext et useMemo comme "Cookies"
 */
ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
        <App />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
