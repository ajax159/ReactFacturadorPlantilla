import { useState, createContext } from 'react'

export const IngresoContext = createContext();
export const useEnviaringreso = () => {
    const [movId, setMovId] = useState('')
    const [cliente, setCliente] = useState('')
    const [activeindex, setActiveIndex] = useState(0)
    const print = () => {
        if (activeindex === 0) {
            const data = {
                facMovimientocajamcaId: movId,
                facClienteCliId: cliente,
                mdeTipomovimiento: 1,
                mdeMonto: 1,
                mdeDescripcion: 'Ingreso de Efectivo',
                mdeObservaciones: 'Ingreso de Efectivo',
                mdeMotivo: 'Ingreso de Efectivo',
                glbEstadoEstId: 1,
                createdBy: 1,
                gecId: 1,
                empId: 1
            }
            console.log(data)
        } else {
            console.log('Egreso')
        }

    }
    return {
        setMovId,
        print,
        activeindex,
        setActiveIndex,
        setCliente,
        movId,
        cliente
    }
}


