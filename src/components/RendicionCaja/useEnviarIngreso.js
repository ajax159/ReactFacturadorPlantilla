import { useState, createContext } from 'react'

export const IngresoContext = createContext();
export const useEnviaringreso = () => {
    const [movId, setMovId] = useState('')
    const [cliente, setCliente] = useState('')
    const [activeindex, setActiveIndex] = useState(0)
    const [movimiento, setMovimiento] = useState('')
    const [motivo, setMotivo] = useState('')
    const [monto, setMonto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const clearForm = () => {
        setCliente('')
        setMotivo('')
        setMonto('')
        setDescripcion('')
        setObservaciones('')
    }
    const data = {
        facMovimientocajamcaId: movId,
        facClienteCliId: cliente,
        mdeTipomovimiento: movimiento,
        mdeMonto: monto,
        mdeDescripcion: descripcion,
        mdeObservaciones: observaciones,
        mdeMotivo: motivo,
        glbEstadoEstId: 1,
        createdBy: 1,
        gecId: 1,
        empId: 1
    }
    const print = () => {
        if (activeindex === 0) {
            console.log(data)
        } else {
            console.log(data)
        }

    }
    return {
        setMovId,
        print,
        activeindex,
        setActiveIndex,
        setCliente,
        setMovimiento,
        setDescripcion,
        setMotivo,
        setMonto,
        setObservaciones,
        movId,
        cliente,
        clearForm
    }
}


