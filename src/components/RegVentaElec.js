import React from 'react'
import { Panel } from 'primereact/panel';

import 'primeicons/primeicons.css';

import { Card } from 'primereact/card';
        
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';
        
import { Button } from 'primereact/button';
import { Select } from '@tremor/react';
import { useState } from "react";
export default function RegVentaElec() {

  const forminput = {
    maxHeight: 14,
    fontSize: '12px',
  };

  const span = {
    minWidth: '90px'
  }

  const iconinput = {
    fontSize: '1rem'
  }
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    'Contado',
    'Credito'
];

  return (
    <Panel header="Registrar Venta Electronica" className='px-3 py-3' toggleable >
      <div id="Contenedor" className="card">
        <div id='Segmento1' className='flex-column'>
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
            <InputText placeholder="gmod159@gmail.com" style={forminput}/>
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
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} className='py-0' placeholder="Forma pago"  showClear style={{height:'26px'}}/>
          </div>
        </div>

        <div id='Segmento2'>

        </div>
      </div>
    </Panel>
  )
}
