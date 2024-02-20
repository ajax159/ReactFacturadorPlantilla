import 'primeflex/primeflex.css';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useContext, useEffect } from 'react'
import { IngresoContext } from './useEnviarIngreso.js';
import clienteFetch from './fetchCliente.js';


const Egresos = () => {
    const globalRendicion = useContext(IngresoContext);
    const [egreso, setEgreso] = useState('');
    const [personal, setPersonal] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState([]);

    useEffect(() => {
        clienteFetch().then((data) => {
            setCliente(data);
        });
    }, [])
    
    const egresoChange = (e) => {
        setEgreso(e)
        switch (e) {
            case 1:
                document.getElementById('cliente').removeAttribute('hidden');
                document.getElementById('cliente2').removeAttribute('hidden');
                document.getElementById('personaldiv').setAttribute('hidden', true);
                document.getElementById('ordenventa').setAttribute('hidden', true);
                document.getElementById('ordenventa2').setAttribute('hidden', true);
                document.getElementById('imporigen').setAttribute('hidden', true);
                document.getElementById('saldo').setAttribute('hidden', true);
                break;
            case 2:
                document.getElementById('cliente').setAttribute('hidden', true);
                document.getElementById('cliente2').setAttribute('hidden', true);
                document.getElementById('personaldiv').removeAttribute('hidden');
                document.getElementById('ordenventa').setAttribute('hidden', true);
                document.getElementById('ordenventa2').setAttribute('hidden', true);
                document.getElementById('imporigen').setAttribute('hidden', true);
                document.getElementById('saldo').setAttribute('hidden', true);
                break;
            case 3:
                document.getElementById('cliente').setAttribute('hidden', true);
                document.getElementById('cliente2').setAttribute('hidden', true);
                document.getElementById('personaldiv').removeAttribute('hidden');
                document.getElementById('ordenventa').setAttribute('hidden', true);
                document.getElementById('ordenventa2').setAttribute('hidden', true);
                document.getElementById('imporigen').setAttribute('hidden', true);
                document.getElementById('saldo').setAttribute('hidden', true);
                break;
            case 4:
                document.getElementById('ordenventa').removeAttribute('hidden');
                document.getElementById('ordenventa2').removeAttribute('hidden');
                document.getElementById('personaldiv').setAttribute('hidden', true);
                document.getElementById('cliente').setAttribute('hidden', true);
                document.getElementById('cliente2').setAttribute('hidden', true);
                document.getElementById('imporigen').removeAttribute('hidden');
                document.getElementById('saldo').removeAttribute('hidden');
                break;
            case 5:
                document.getElementById('cliente').setAttribute('hidden', true);
                document.getElementById('cliente2').setAttribute('hidden', true);
                document.getElementById('personaldiv').removeAttribute('hidden');
                document.getElementById('ordenventa').setAttribute('hidden', true);
                document.getElementById('ordenventa2').setAttribute('hidden', true);
                document.getElementById('imporigen').setAttribute('hidden', true);
                document.getElementById('saldo').setAttribute('hidden', true);
                break;
            case 0:
console.log('0')
                break;
            default:
                document.getElementById('cliente').setAttribute('hidden', true);
                document.getElementById('cliente2').setAttribute('hidden', true);
                document.getElementById('personaldiv').setAttribute('hidden', true);
                document.getElementById('ordenventa').setAttribute('hidden', true);
                document.getElementById('ordenventa2').setAttribute('hidden', true);
                document.getElementById('imporigen').setAttribute('hidden', true);
                document.getElementById('saldo').setAttribute('hidden', true);
                break;
        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '880px' }} id='a'>
                    <div id='b'>
                        <FormControl sx={{ m: 0.4, width: '25ch' }} size="small">
                            <InputLabel id="motivo-label">Motivo</InputLabel>
                            <Select
                                labelId="motivo-label"
                                id="motivo-form"
                                label="Motivo"
                                value={egreso}
                                onChange={(e) => {egresoChange(e.target.value);globalRendicion.setMotivo(e.target.value);globalRendicion.setMovimiento(2)}}
                            >
                                <MenuItem value={4}>Pago de Proveedores</MenuItem>
                                <MenuItem value={5}>Pago de Trabajadores</MenuItem>
                                <MenuItem value={6}>Dpto. Bancos</MenuItem>
                                <MenuItem value={7}>Gastos Varios</MenuItem>
                                <MenuItem value={8}>Otros</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" >
                            <InputLabel htmlFor="descripcion-form">Descripcion</InputLabel>
                            <OutlinedInput
                                id="descripcion-form"
                                label="Descripcion"
                                onChange={(e) => globalRendicion.setDescripcion(e.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div className='flex'>
                        <div className="flex-1" id='personaldiv'>
                        <Autocomplete disablePortal fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" options={personal} getOptionLabel={(option) => option.perNombreCompleto} renderInput={(params) => <TextField {...params} label="Personal"/>}
                                    onChange={(event, value) => {
                                        setPersonal(value.perNombreCompleto);
                                        globalRendicion.setPersonal(value.perId)
                                    }}
                                />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 mr-1" id='cliente'>
                        <Autocomplete disablePortal fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" options={cliente} getOptionLabel={(option) => option.cliNdocumento} renderInput={(params) => <TextField {...params} label="RuC"/>}
                                    onChange={(event, value) => {
                                        setClienteSeleccionado(value.cliNombreCompleto);
                                        globalRendicion.setCliente(value.cliId)
                                    }}
                                />
                        </div>
                        <div className="flex-1" id='cliente2'>
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="razon-form">Razon Social</InputLabel>
                                <OutlinedInput
                                    id="razon-form"
                                    label="Razon Social"
                                    value={clienteSeleccionado}
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="flex-1" id='ordenventa'>
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" >
                                <InputLabel htmlFor="oventa-form">Orden Venta</InputLabel>
                                <OutlinedInput
                                    id="oventa-form"
                                    label="Orden Venta"
                                />
                            </FormControl>
                        </div>
                        <div id='ordenventa2'>
                            <IconButton aria-label="search">
                                <ManageSearchIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex">
                        <div id='imporigen' className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="imporigen-form">Importe Origen</InputLabel>
                                <OutlinedInput
                                    id="imporigen-form"
                                    label="Importe Origen"
                                />
                            </FormControl>
                        </div>
                        <div id='saldo' className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="saldo-form">Saldo</InputLabel>
                                <OutlinedInput
                                    id="saldo-form"
                                    label="Saldo"
                                />
                            </FormControl>
                        </div>
                        <div className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                <InputLabel htmlFor="efectivo-form">Efectivo</InputLabel>
                                <OutlinedInput
                                    id="efectivo-form"
                                    label="Efectivo"
                                    onChange={(e) => globalRendicion.setMonto(e.target.value)}
                                />
                            </FormControl>
                        </div>
                        <div className="flex-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="tcambio-form">Tipo de Cambio</InputLabel>
                                <OutlinedInput
                                    id="tcambio-form"
                                    label="Tipo de Cambio"
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1">
                            <TextField
                                fullWidth sx={{ m: 0.4 }}
                                id="outlined-multiline-static"
                                label="Observaciones"
                                multiline
                                rows={4}
                                size="small"
                                onChange={(e) => globalRendicion.setObservaciones(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Egresos