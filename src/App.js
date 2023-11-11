import './App.css';
// import CardBase from './components/CardBase';
import MenubarDemo from './components/MenuBar';
// import RegVentaElec from './components/RegVentaElec';
// import ListarVentas from './components/ListarVentas';
import Asignacion from './components/Asignacion';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function App({ Component, pageProps }) {
  return (
    // <>
    // <CardBase />
    // </>
    <>
        <MenubarDemo />
        <Asignacion />
    </>
  );
}

export default App;
