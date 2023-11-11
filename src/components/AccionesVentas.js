import React from 'react'


import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
        
const AccionesVentas = () => {
    const items = [
        {
            label: 'Busqueda Avanzada',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Buscar Cotizacion',
            icon: 'pi pi-times'
        },
        {
            label: 'Buscar Ord. Venta',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/'
            }
        },
    ];
    const forminput = {
        maxHeight: 14,
        fontSize: '12px'
      };
    const startContent = (
        <React.Fragment>
            <Button label="Guardar" icon="pi pi-plus" className="mr-2"  />
            <Button label="Cancelar" icon="pi pi-upload" className="p-button-danger" />
            <i className="pi pi-bars p-toolbar-separator mr-2" />
            <InputText className="p-inputtext-sm" style={forminput}/>
            <SplitButton label="Ord. Venta" icon="pi pi-check" model={items} className="p-button-warning" ></SplitButton>
        </React.Fragment>
    );

  return (
    <div className="card">
    <Toolbar start={startContent}/>
    </div>
  )
}

export default AccionesVentas