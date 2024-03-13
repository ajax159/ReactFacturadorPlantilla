import { useAxiosFetch } from './useAxiosFetch';
import { useListarCajaStore } from '../components/AperturarCaja/stores/listarcajaStore.js';
import apiSource from '../apiSource.js';
export function useMovimientocaja() {
    const setDatos = useListarCajaStore(state => state.setDatos);
    let apiroute = apiSource();
    const fetchingDataListar = useAxiosFetch();
    const fetchData = async (e) => {
        let fechainicio = ''
        let fechafin = ''
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-CA');
        if (!e) {
            fechainicio = formattedDate;
            fechafin = formattedDate;;
        } else {
            fechainicio = e[0].toISOString().slice(0, 10);
            fechafin = e[1].toISOString().slice(0, 10);
        }
        let url = `${apiroute}/movimientocaja/listarmovcaja/1/1?fechainicio=${fechainicio}&fechafin=${fechafin}`;
        fetchingDataListar.fetchData(url, { method: 'GET' }).then(response => {
            setDatos(response.data)
        });
    };

    return {
        fetchData
    }
}