
import { TabView, TabPanel } from 'primereact/tabview';
import './styles/RendiciondeCaja.css';
import 'primeflex/primeflex.css';
import './styles/RendiciondeCaja.css';
import Ingresos from './RendicionCaja/Ingresos.js';
import {useEnviaringreso} from './RendicionCaja/useEnviarIngreso.js';
import Egresos from './RendicionCaja/Egresos.js';

const RendiciondeCaja = ({idMov}) => {
    const enviarIngreso = useEnviaringreso();

    return (
        <div>
            <TabView activeIndex={enviarIngreso.activeindex} onTabChange={(e)=>{enviarIngreso.setActiveIndex(e.index);enviarIngreso.setMovId(idMov)}}>
                <TabPanel header="Ingresos">
                    <Ingresos/>
                </TabPanel>
                <TabPanel header="Egresos">
                    <Egresos />
                </TabPanel>
            </TabView>
        </div>
    )
}
export default RendiciondeCaja
