import React from 'react'
import RegVentProd from './RegVentProd';
import { Panel } from 'primereact/panel';
import 'primeicons/primeicons.css';
import AccionesVentas from './AccionesVentas';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { useState } from "react";
import './styles/Regventa.css';

export default function RegVentaElec() {

  const forminput = {
    maxHeight: 14,
    fontSize: '12px'
  };

  const span = {
    minWidth: '80px'
  }

  const iconinput = {
    fontSize: '1rem'
  }
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    'Contado',
    'Credito'
  ];

  const anticipo = ['Si', 'No'];
  const [value, setValue] = useState(anticipo[1]);
  return (
    <div>
      <Panel header="Registrar Venta Electronica" className='px-1 pt-2' toggleable >
        <div id="Contenedor" className="flex">
          <div id='Segmento1' className='flex-column' style={{ maxWidth: '260px' }}>
            <div className="p-inputgroup flex-1 pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Fecha:</span>
              <InputText placeholder="Website" style={forminput} />
            </div>
            <div className="p-inputgroup pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Cliente:</span>
              <InputText placeholder="RUC/DNI" style={forminput} />
              <Button icon="pi pi-search" severity="info" raised style={{ ...forminput, ...iconinput }} />
            </div>
            <div className="p-inputgroup pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Email:</span>
              <InputText placeholder="gmod159@gmail.com" style={forminput} />
              <Button icon="pi pi-pencil" severity="info" raised style={{ ...forminput, ...iconinput }} />
            </div>
            <div className="p-inputgroup flex-1 pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>O.C./O.S.:</span>
              <InputText placeholder="Website" style={forminput} />
            </div>
            <div className="p-inputgroup flex-1 pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>G. REM.:</span>
              <InputText placeholder="Website" style={forminput} />
            </div>
            <div className="p-inputgroup flex-1 pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>M.PAGO:</span>
              <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="Forma pago" showClear style={{ height: '26px' }} />
            </div>
            <div className="p-inputgroup flex-1 pb-1">
              <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Anticipo:</span>
              <SelectButton value={value} onChange={(e) => setValue(e.value)} options={anticipo} raised />
            </div>
          </div>

          <div id='Segmento2' className='flex-column flex-1 pl-6'>
            <div id="grupo">
              <div id="prime" className='flex'>
                <div id="claseA" style={{ width: '70%' }}>
                  <div id='claseDoc' className='flex'>
                    <div className="p-inputgroup pb-1">
                      <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Tipo:</span>
                      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="Tipo Doc" showClear style={{ height: '26px', marginRight: '5px' }} />
                      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="FF01" showClear style={{ height: '26px', marginRight: '5px' }} />
                      <InputText placeholder="Numero" style={forminput} className='pl-1' />
                    </div>
                  </div>
                  <div className="p-inputgroup flex-1 pb-1">
                    <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Nombres:</span>
                    <InputText placeholder="Jose Alva Vergara" style={forminput} />
                  </div>
                  <div className="p-inputgroup flex-1 pb-1">
                    <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Direccion:</span>
                    <InputText placeholder="JR JOSE OLAYA 535" style={forminput} />
                    <Button icon="pi pi-pencil" severity="info" raised style={{ ...forminput, ...iconinput }} />
                  </div>
                </div>
                <div id="claseB" className='pl-6 flex-1'>
                  <div className="p-inputgroup pb-1">
                    <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Tipo Op:</span>
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="Venta Interna" showClear style={{ height: '26px', marginRight: '5px' }} />
                  </div>
                  <div id='claseMoneda' className='flex'>
                    <div className="p-inputgroup pb-1 pr-1">
                      <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Moneda:</span>
                      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="PEN" showClear style={{ height: '26px', marginRight: '5px' }} />
                      <InputText placeholder="0.00" style={{ ...forminput }} className='pl-1' />
                    </div>
                  </div>
                  <div className="p-inputgroup pb-1">
                    <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>¿Pagado?:</span>
                    <SelectButton options={anticipo} raised />
                  </div>
                </div>
              </div>
              <div className="p-inputgroup pb-1">
                <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Observa.:</span>
                <InputText placeholder="Observacion" style={forminput} />
                <Button icon="pi pi-pencil" severity="info" raised style={{ ...forminput, ...iconinput }} />
              </div>
              <div className='flex' style={{ maxWidth: 450 }}>
                <div className="p-inputgroup flex-1 pr-1">
                  <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>F.VTO.:</span>
                  <InputText placeholder="Fecha Vencimiento" style={forminput} />
                </div>
                <div className="p-inputgroup flex-1 pb-1">
                  <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Busc. Antic:</span>
                  <InputText placeholder="Anticipo" style={forminput} />
                  <Button icon="pi pi-search" severity="info" raised style={{ ...forminput, ...iconinput }} />
                </div>
              </div>
              <div className="p-inputgroup pb-1">
                <span className="p-inputgroup-addon align-items-center justify-content-center" style={{ ...forminput, ...span }}>Retencion:</span>
                <SelectButton options={anticipo} raised />
              </div>
            </div>
          </div>
        </div>
        <AccionesVentas />
      </Panel>
      <RegVentProd />
    </div>
  )
}
