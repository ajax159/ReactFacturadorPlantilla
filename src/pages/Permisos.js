import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import React from 'react';

const Permisos = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const optionsHandle = (
    <Stack style={{ width: '100%' }}>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography ></Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <FormControlLabel
              value="top"
              control={<Switch color="secondary" />}
              label="Visualizar"
              labelPlacement="top"
            />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <FormControlLabel
              value="top"
              control={<Switch color="default" />}
              label="Agregar"
              labelPlacement="top"
            />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <FormControlLabel
              value="top"
              control={<Switch color="primary" />}
              label="Editar"
              labelPlacement="top"
            />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <FormControlLabel
              value="top"
              control={<Switch color="warning" />}
              label="Eliminar"
              labelPlacement="top"
            />
          </Grid>
        </Grid>
        <Divider />
      </div>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography >Asignacion de Documentos</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography >Caja Diaria</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography >Resumen Caja</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography >Reporte Motivos por Caja</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2} >
          <Grid item xs={2} className="flex justify-content-center flex-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography >Reporte Caja Detallado</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
          <Grid item xs={2} className="flex justify-content-center flex-wrap">
            <Checkbox />
          </Grid>
        </Grid>
      </div>
    </Stack>
  )

  return (
    <div style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <Card className="flex justify-content-center flex-wrap">
        <CardContent >
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button>Guardar</Button>
            <Button>Cancelar</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
      
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Caja
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
          {optionsHandle}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Permisos