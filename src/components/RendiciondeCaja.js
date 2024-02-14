
import { TabView, TabPanel } from 'primereact/tabview';
import './styles/RendiciondeCaja.css';
import 'primeflex/primeflex.css';
import './styles/RendiciondeCaja.css';
import Ingresos from './RendicionCaja/Ingresos.js';
import Egresos from './RendicionCaja/Egresos.js';
export const rendicionCaja = (
    <div id="pr_id_4_header" class="p-dialog-title" data-pc-section="headertitle">Rendicion de Caja</div>
)
const RendiciondeCaja = () => {


    return (
        <div>
            <TabView>
                <TabPanel header="Ingresos">
                    <Ingresos />
                </TabPanel>
                <TabPanel header="Egresos">
                    <Egresos />
                </TabPanel>
            </TabView>
        </div>
    )
}

export default RendiciondeCaja
