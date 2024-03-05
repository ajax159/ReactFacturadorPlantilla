import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiSource from './../apiSource';
let api = apiSource();


export function AperturarCaja() {
    const fetchListar = useAxiosFetch();
    const fetchMovimiento = useAxiosFetch();
    const fetchDetalle = useAxiosFetch();
    const [open, setOpen] = useState(false);
    const [caja, setCaja] = useState('');
    const [monto, setMonto] = useState('');

    const { register, reset, handleSubmit } = useForm();
    const [moneda, setMoneda] = useState('1');

    const sentCaja = (event) => {
        setCaja(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
        setCaja('')
        reset();
    };

    useEffect(() => {
        const url = `${api}/caja/listar/1/1`;
        fetchListar.fetchData(url, { method: 'GET' })
        // eslint-disable-next-line
    }, []);



    const aperturar = () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-CA');

        const contentData = {
            faccajacajId: caja,
            mcaTipomovimiento: 1,
            mcaFechaapertura: formattedDate,
            mcaTotal: monto,
            mcaMoneda: moneda,
            glbEstadoEstId: 1,
            createdBy: 1,
            gecId: 1,
            empId: 1
        }
        console.log(contentData);
        const url = `${api}/movimientocaja/crear`;
        fetchMovimiento.fetchData(url, { method: 'POST', data: contentData }).then(response => {
            if (response.status === 201) {
                const data = response.data;
                guardarMov(data.data.mcaId, data.data.mcaTipomovimiento, data.data.mcaTotal);
            } else {
                console.log('errorrrr')
            }
        }).catch(error => {
            console.log('Error:', error.message);
        });

        const guardarMov = (idMov, idTip, monT) => {
            const dataFetch = {
                facMovimientocajamcaId: idMov,
                mdeTipomovimiento: idTip,
                mdeMonto: monT,
                glbEstadoEstId: 1,
                createdBy: 1,
                gecId: 1,
                empId: 1
            }
            console.log(dataFetch);
            fetchDetalle.fetchData(`${api}/movimientodetalle/crear`, { method: 'POST', data: dataFetch })
        }
        handleClose();
    }



    const dialog = (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={handleSubmit(aperturar)}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Aperturar Caja
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" size='small'>Caja</InputLabel>
                                    <Select
                                        value={caja}
                                        label="Caja"
                                        {...register("cajas")}
                                        onChange={sentCaja}
                                        size="small"
                                        onSelect={(e) => setCaja(e.key)}
                                    >
                                        {fetchListar.data.data ? fetchListar.data.data.map((item) => <MenuItem key={item.cajId} value={item.cajId}>{item.cajDescripcion}</MenuItem>) : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register("monto")} id="outlined-basic" label="Monto Inicial" variant="outlined" size="small" fullWidth onChange={(e) => setMonto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Moneda</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue="1"
                                        onChange={(e) => setMoneda(e.target.value)}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Soles" />
                                        <FormControlLabel value="2" control={<Radio />} label="Dolares" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' variant="contained" autoFocus>
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );

    return {
        dialog,
        setOpen
    }

}