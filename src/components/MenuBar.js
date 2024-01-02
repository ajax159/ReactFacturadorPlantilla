import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Outlet } from 'react-router-dom';

export default function MenuBar() {
    
const items = [
    {
       label:'Inicio',
       icon:'pi pi-fw pi-home',
       url: '/'
    },
    {
       label:'Caja',
       icon:'pi pi-fw pi-money-bill',
       items:[
         {
            label:'Asignacion de Documentos',
            icon:'pi pi-fw pi-briefcase',
            url: '/asignacion'
         },
          {
             label:'Caja Diaria',
             icon:'pi pi-fw pi-database',
             url: '/cajadiaria'
          },
          {
             label:'Resumen Caja',
             icon:'pi pi-fw pi-copy'
          },
          {
             label:'Reporte Motivos por Caja',
             icon:'pi pi-fw pi-server'
          },
          {
             label:'Reporte Caja Detallado',
             icon:'pi pi-fw pi-list'
          },

       ]
    },
    {
       label:'Gestion CDP',
       icon:'pi pi-fw pi-desktop',
       items:[
          {
             label:'Venta Electronica',
             icon:'pi pi-fw pi-user-plus',
             items:[
                {
                   label:'Reg. Venta Electronica',
                   icon:'pi pi-fw pi-check-square'
                },
                {
                   icon:'pi pi-fw pi-book',
                   label:'Consulta Venta Electronica'
                }
             ]
          },
          {
             label:'Compra',
             icon:'pi pi-fw pi-shopping-bag',
             items:[
                {
                   label:'Reg. Compras',
                   icon:'pi pi-fw pi-shopping-cart'
                },
                {
                   icon:'pi pi-fw pi-book',
                   label:'Consultar Compras'
                }
             ]
          },
          {
             label:'Status CDP',
             icon:'pi pi-fw pi-box',
             items:[
                {
                   label:'CDP',
                   icon:'pi pi-fw pi-briefcase'
                },
                {
                   icon:'pi pi-fw pi-calendar',
                   label:'Resumenes Diarios'
                }
             ]
          }
       ]
    },
    {
       label:'Events',
       icon:'pi pi-fw pi-calendar',
       items:[
          {
             label:'Edit',
             icon:'pi pi-fw pi-pencil',
             items:[
                {
                   label:'Save',
                   icon:'pi pi-fw pi-calendar-plus'
                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-calendar-minus'
                },

             ]
          },
          {
             label:'Archieve',
             icon:'pi pi-fw pi-calendar-times',
             items:[
                {
                   label:'Remove',
                   icon:'pi pi-fw pi-calendar-minus'
                }
             ]
          }
       ]
    },
    {
       label:'Quit',
       icon:'pi pi-fw pi-power-off'
    }
 ];
 const start = <img alt="logo" src="https://www.primefaces.org/primereact-v8/images/logo.png" width={40} height={40} className="mr-2"></img>;
 const end = <InputText placeholder="Search" type="text" />;
  return (
    <div>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        <Outlet/>
    </div>
  );
}
