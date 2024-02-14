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
import React, { useState } from 'react'
const Egresos = () => {
    const [egreso, setEgreso] = useState('');
    
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
                                onChange={(e) => egresoChange(e.target.value)}
                            >
                                <MenuItem value={1}>Pago de Proveedores</MenuItem>
                                <MenuItem value={2}>Pago de Trabajadores</MenuItem>
                                <MenuItem value={3}>Dpto. Bancos</MenuItem>
                                <MenuItem value={4}>Gastos Varios</MenuItem>
                                <MenuItem value={5}>Otros</MenuItem>
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
                    <div className='flex'>
                        <div className="flex-1" id='personaldiv'>
                            <FormControl fullWidth sx={{ m: 0.4 }} size="small">
                                <InputLabel id="personal-label">Personal</InputLabel>
                                <Select
                                    labelId="personal-label"
                                    id="personal-form"
                                    label="Personal"
                                >
                                    <MenuItem >jsm</MenuItem>
                                    <MenuItem >sf</MenuItem>
                                    <MenuItem >sfs</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 mr-1" id='cliente'>
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                <InputLabel htmlFor="ruc-form">RUC</InputLabel>
                                <OutlinedInput
                                    id="ruc-form"
                                    label="RUC"
                                />
                            </FormControl>
                        </div>
                        <div className="flex-1" id='cliente2'>
                            <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small" disabled>
                                <InputLabel htmlFor="razon-form">Razon Social</InputLabel>
                                <OutlinedInput
                                    id="razon-form"
                                    label="Razon Social"
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
                </div>
            </Box>
        </div>
    )
}

export default Egresos