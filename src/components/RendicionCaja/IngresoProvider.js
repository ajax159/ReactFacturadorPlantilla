import { useEnviaringreso, IngresoContext } from './useEnviarIngreso.js';

export const IngresoProvider = ({ children }) => {
    const enviarIngreso = useEnviaringreso();

    return (
        <IngresoContext.Provider value={enviarIngreso}>
            {children}
        </IngresoContext.Provider>
    );
};