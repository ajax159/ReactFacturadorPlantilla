
import { TabView, TabPanel } from 'primereact/tabview';
import './styles/RendiciondeCaja.css';
import 'primeflex/primeflex.css';
import './styles/RendiciondeCaja.css';
import Ingresos, {enviarIngreso} from './RendicionCaja/Ingresos.js';
import Egresos from './RendicionCaja/Egresos.js';
import React, { useState } from 'react'
export const useEnviar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const enviarSi = () => {
        if (activeIndex === 0) {
            enviarIngreso()
        } else {
            console.log('Egresos')
        }
    }
    return{
        activeIndex,
        setActiveIndex,
        enviarSi
    }
}

const RendiciondeCaja = () => {
    const enviarItems = useEnviar();
    return (
        <div>
            <TabView activeIndex={enviarItems.activeIndex} onTabChange={(e)=>enviarItems.setActiveIndex(e.index)}>
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
