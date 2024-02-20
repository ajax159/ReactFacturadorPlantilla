import apiSource from '../../apiSource.js';
let apiroute = apiSource();

const clienteFetch = async () => {
    const response = await fetch(`${apiroute}/cliente/listar`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const arrayData = data.data.facCliente;
    return arrayData;
};

export default clienteFetch;