import './App.css';
// import CardBase from './components/CardBase';
import MenubarDemo from './components/MenuBar';
// import RegVentaElec from './components/RegVentaElec';
// import ListarVentas from './components/ListarVentas';
import Asignacion from './components/Asignacion';
import Home from './components/Home';
import CajaDiaria from './components/CajaDiaria';
import { Routes, Route } from 'react-router-dom';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function App({ Component, pageProps }) {
  return (
<Routes>
  <Route path="/" element={<MenubarDemo />}>
  <Route path="asignacion" element={<Asignacion />}/>
    <Route path="/" element={<Home />}/>
    <Route path="asignacion" element={<Asignacion />}/>
    <Route path="cajadiaria" element={<CajaDiaria />}/>
  </Route>
</Routes>
  );
}

export default App;
