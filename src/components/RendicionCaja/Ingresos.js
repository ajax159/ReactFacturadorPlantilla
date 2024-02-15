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
import { Divider } from 'primereact/divider';
import React, { useState } from 'react'

export const enviarIngreso = () => {
console.log('enviarIngreso2222')
}

const Ingresos = () => {
    const [rendicion, setRendicion] = useState('');
    const rendChange = (e) => {
        setRendicion(e);
        switch (e.target.value) {
            case 1:
                document.getElementById('medioPago').removeAttribute('hidden');
                document.getElementById('nventa').removeAttribute('hidden');
                document.getElementById('nventa1').removeAttribute('hidden');
                document.getElementById('nventa2').removeAttribute('hidden');
                document.getElementById('nventa3').removeAttribute('hidden');
                document.getElementById('nventa4').removeAttribute('hidden');
                document.getElementById('nventa5').removeAttribute('hidden');
                document.getElementById('nventa6').removeAttribute('hidden');
                break;
            case 2:
                document.getElementById('nventa').setAttribute('hidden', true);
                document.getElementById('nventa1').setAttribute('hidden', true);
                document.getElementById('nventa2').removeAttribute('hidden');
                document.getElementById('nventa3').removeAttribute('hidden');
                document.getElementById('nventa4').setAttribute('hidden', true);
                document.getElementById('nventa5').removeAttribute('hidden');
                document.getElementById('nventa6').removeAttribute('hidden');
                document.getElementById('medioPago').setAttribute('hidden', true);
                break;
            case 0:
                document.getElementById('nventa').setAttribute('hidden', true);
                document.getElementById('nventa1').setAttribute('hidden', true);
                document.getElementById('nventa2').setAttribute('hidden', true);
                document.getElementById('nventa3').setAttribute('hidden', true);
                document.getElementById('nventa4').setAttribute('hidden', true);
                document.getElementById('nventa5').setAttribute('hidden', true);
                document.getElementById('nventa6').setAttribute('hidden', true);
                document.getElementById('medioPago').setAttribute('hidden', true);
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '880px' }}>
                    <div id='1'>
                        <FormControl sx={{ m: 0.4, width: '25ch' }} size="small">
                            <InputLabel id="motivo-label">Motivo</InputLabel>
                            <Select
                                labelId="motivo-label"
                                id="motivo-form"
                                label="Motivo"
                                value={rendicion}
                                onChange={rendChange}
                            >
                                <MenuItem value={1} >Venta Electronica</MenuItem>
                                <MenuItem value={2}>Nota de Venta</MenuItem>
                                <MenuItem value={0}>Ingreso de Efectivo</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" >
                            <InputLabel htmlFor="descripcion-form">Descripcion</InputLabel>
                            <OutlinedInput
                                id="descripcion-form"
                                label="Descripcion"
                            />
                        </FormControl>

                    </div>
                    <div className="flex">
                        <div id='nventa' className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} size="small" disabled>
                                <InputLabel id="comprobante-label">Comprobante</InputLabel>
                                <Select
                                    labelId="comprobante-label"
                                    id="comprobante-form"
                                    label="Comprobante"
                                >
                                    <MenuItem >Venta Electronica</MenuItem>
                                    <MenuItem >Nota de Venta</MenuItem>
                                    <MenuItem >Ingreso de Efectivo</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='nventa1' className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="serie-form">Serie</InputLabel>
                                <OutlinedInput
                                    id="serie-form"
                                    label="Serie"
                                />
                            </FormControl>
                        </div>
                        <div id='nventa2' className="flex-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" >
                                <InputLabel htmlFor="numero-form">Numero</InputLabel>
                                <OutlinedInput
                                    id="numero-form"
                                    label="Numero"
                                />
                            </FormControl>
                        </div>
                        <div id='nventa3'>
                            <IconButton aria-label="delete">
                                <ManageSearchIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div id='nventa4'>
                        <div className="flex">
                            <div className="flex-1 mr-1">
                                <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                    <InputLabel htmlFor="ruc-form">RUC</InputLabel>
                                    <OutlinedInput
                                        id="ruc-form"
                                        label="RUC"
                                    />
                                </FormControl>
                            </div>
                            <div className="flex-1">
                                <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                    <InputLabel htmlFor="razon-form">Razon Social</InputLabel>
                                    <OutlinedInput
                                        id="razon-form"
                                        label="Razon Social"
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div id='nventa5' className="flex-1 mr-1">
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="imporigen-form">Importe Origen</InputLabel>
                                <OutlinedInput
                                    id="imporigen-form"
                                    label="Importe Origen"
                                />
                            </FormControl>
                        </div>
                        <div id='nventa6' className="flex-1 mr-1">
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
                            />
                        </div>
                    </div>
                    <div id='medioPago'>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <b>Otros medios de pago</b>
                            </div>
                        </Divider>
                        <div className="flex">
                            <div className='align-items-center justify-content-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 141.732 141.732" id="visa"><g fill="#2566af"><path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"></path></g><path fill="#e6a540" d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"></path><path fill="none" d="M0 0h141.732v141.732H0z"></path></svg>
                            </div>
                            <div className="mr-1">
                                <FormControl sx={{ m: 0.4, width: '25ch' }} variant="outlined" size="small">
                                    <InputLabel htmlFor="importe-form">Importe</InputLabel>
                                    <OutlinedInput
                                        id="importe-form"
                                        label="Importe"
                                    />
                                </FormControl>
                            </div>
                            <div className="">
                                <FormControl sx={{ m: 0.4, width: '25ch' }} variant="outlined" size="small">
                                    <InputLabel htmlFor="noperacion-form">Nro de Operacion</InputLabel>
                                    <OutlinedInput
                                        id="noperacion-form"
                                        label="Nro de Operacion"
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex">
                            <div className='align-items-center justify-content-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 141.732 141.732" id="visa"><g fill="#2566af"><path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"></path></g><path fill="#e6a540" d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z"></path><path fill="none" d="M0 0h141.732v141.732H0z"></path></svg>
                            </div>
                            <div className="mr-1">
                                <FormControl sx={{ m: 0.4, width: '25ch' }} variant="outlined" size="small">
                                    <InputLabel htmlFor="importe-form">Importe</InputLabel>
                                    <OutlinedInput
                                        id="importe-form"
                                        label="Importe"
                                    />
                                </FormControl>
                            </div>
                            <div className="">
                                <FormControl sx={{ m: 0.4, width: '25ch' }} variant="outlined" size="small">
                                    <InputLabel htmlFor="noperacion-form">Nro de Operacion</InputLabel>
                                    <OutlinedInput
                                        id="noperacion-form"
                                        label="Nro de Operacion"
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>


            </Box>
        </div>
    );
}

export default Ingresos;