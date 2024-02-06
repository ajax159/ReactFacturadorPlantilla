
import { TabView, TabPanel } from 'primereact/tabview';
import './styles/RendiciondeCaja.css';
import 'primeflex/primeflex.css';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from 'primereact/divider';
const RendiciondeCaja = () => {
    return (
        <div>
            <TabView>
                <TabPanel header="Ingresos">
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <div>
                                <FormControl sx={{ m: 0.4, width: '25ch' }} size="small">
                                    <InputLabel id="motivo-label">Motivo</InputLabel>
                                    <Select
                                        labelId="motivo-label"
                                        id="motivo-form"
                                        label="Motivo"
                                    >
                                        <MenuItem value={10}>Venta Electronica</MenuItem>
                                        <MenuItem value={20}>Nota de Venta</MenuItem>
                                        <MenuItem value={30}>Ingreso de Efectivo</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                    <InputLabel htmlFor="descripcion-form">Descripcion</InputLabel>
                                    <OutlinedInput
                                        id="descripcion-form"
                                        label="Descripcion"
                                    />
                                </FormControl>
                            </div>
                            <div class="flex">
                                <div class="flex-1 mr-1">
                                <FormControl fullWidth sx={{ m: 0.4 }} size="small" disabled>
                                    <InputLabel id="comprobante-label">Comprobante</InputLabel>
                                    <Select
                                        labelId="comprobante-label"
                                        id="comprobante-form"
                                        label="Comprobante"
                                    >
                                        <MenuItem value={10}>Venta Electronica</MenuItem>
                                        <MenuItem value={20}>Nota de Venta</MenuItem>
                                        <MenuItem value={30}>Ingreso de Efectivo</MenuItem>
                                    </Select>
                                </FormControl>
                                </div>
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="serie-form">Serie</InputLabel>
                                        <OutlinedInput
                                            id="serie-form"
                                            label="Serie"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="numero-form">Numero</InputLabel>
                                        <OutlinedInput
                                            id="numero-form"
                                            label="Numero"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="ruc-form">RUC</InputLabel>
                                        <OutlinedInput
                                            id="ruc-form"
                                            label="RUC"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="razon-form">Razon Social</InputLabel>
                                        <OutlinedInput
                                            id="razon-form"
                                            label="Razon Social"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="imporigen-form">Importe Origen</InputLabel>
                                        <OutlinedInput
                                            id="imporigen-form"
                                            label="Importe Origen"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="saldo-form">Saldo</InputLabel>
                                        <OutlinedInput
                                            id="saldo-form"
                                            label="Saldo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="efectivo-form">Efectivo</InputLabel>
                                        <OutlinedInput
                                            id="efectivo-form"
                                            label="Efectivo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="tcambio-form">Tipo de Cambio</InputLabel>
                                        <OutlinedInput
                                            id="tcambio-form"
                                            label="Tipo de Cambio"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex-1">
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
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <b>Otros medios de pago</b>
                                </div>
                            </Divider>
                            <div class="flex">
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="saldo-form">Saldo</InputLabel>
                                        <OutlinedInput
                                            id="saldo-form"
                                            label="Saldo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="efectivo-form">Efectivo</InputLabel>
                                        <OutlinedInput
                                            id="efectivo-form"
                                            label="Efectivo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="tcambio-form">Tipo de Cambio</InputLabel>
                                        <OutlinedInput
                                            id="tcambio-form"
                                            label="Tipo de Cambio"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="saldo-form">Saldo</InputLabel>
                                        <OutlinedInput
                                            id="saldo-form"
                                            label="Saldo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1 mr-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="efectivo-form">Efectivo</InputLabel>
                                        <OutlinedInput
                                            id="efectivo-form"
                                            label="Efectivo"
                                        />
                                    </FormControl>
                                </div>
                                <div class="flex-1">
                                    <FormControl fullWidth sx={{ m: 0.4 }} variant="outlined" size="small">
                                        <InputLabel htmlFor="tcambio-form">Tipo de Cambio</InputLabel>
                                        <OutlinedInput
                                            id="tcambio-form"
                                            label="Tipo de Cambio"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>


                    </Box>
                </TabPanel>
                <TabPanel header="Egresos">

                </TabPanel>
            </TabView>
        </div>
    )
}

export default RendiciondeCaja