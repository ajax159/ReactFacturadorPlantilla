import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Outlet } from 'react-router-dom';
import { useFetchAuth } from '../hooks/useFetchAuth';
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
   const fetchData = useFetchAuth('');
   const navigate = useNavigate();
   const items = [
      {
         idmodulo: '1',
         label: 'Inicio',
         icon: 'pi pi-fw pi-home',
         command: () => { navigate('/') }
      },
      {
         idmodulo: '2',
         label: 'Caja',
         icon: 'pi pi-fw pi-money-bill',
         items: [
            {
               id: '1',
               label: 'Asignacion de Documentos',
               icon: 'pi pi-fw pi-briefcase',
               command: () => { navigate('/asignacion') }
            },
            {
               id: '2',
               label: 'Caja Diaria',
               icon: 'pi pi-fw pi-database',
               command: () => { navigate('/cajadiaria') }
            },
            {
               id: '3',
               label: 'Resumen Caja',
               icon: 'pi pi-fw pi-copy',
               command: () => { navigate('/resumencaja') }
            },
            {
               id: '4',
               label: 'Reporte Motivos por Caja',
               icon: 'pi pi-fw pi-server',
               command: () => { navigate('/reportecaja') }
            },
            {
               id: '5',
               label: 'Reporte Caja Detallado',
               icon: 'pi pi-fw pi-list',
               command: () => { navigate('/reportedetallado') }
            },

         ]
      },
      {
         idmodulo: '4',
         label: 'Gestion CDP',
         icon: 'pi pi-fw pi-desktop',
         items: [
            {
               idmodulo: '4',
               label: 'Venta Electronica',
               icon: 'pi pi-fw pi-user-plus',
               items: [
                  {
                     id: '6',
                     label: 'Reg. Venta Electronica',
                     icon: 'pi pi-fw pi-check-square',
                     command: () => { navigate('/ventaelectronica') }
                  },
                  {
                     id: '7',
                     icon: 'pi pi-fw pi-book',
                     label: 'Consulta Venta Electronica',
                     command: () => { navigate('/consultaventaelectronica') }
                  }
               ]
            },
            {
               idmodulo: '5',
               label: 'Compra',
               icon: 'pi pi-fw pi-shopping-bag',
               items: [
                  {
                     id: '8',
                     label: 'Reg. Compras',
                     icon: 'pi pi-fw pi-shopping-cart',
                     command: () => { navigate('/compras') }
                  },
                  {
                     id: '9',
                     icon: 'pi pi-fw pi-book',
                     label: 'Consultar Compras',
                     command: () => { navigate('/consultacompras') }
                  }
               ]
            },
            {
               idmodulo: '6',
               label: 'Status CDP',
               icon: 'pi pi-fw pi-box',
               items: [
                  {
                     id: '10',
                     label: 'CDP',
                     icon: 'pi pi-fw pi-briefcase',
                     command: () => { navigate('/cdp') }
                  },
                  {
                     id: '11',
                     icon: 'pi pi-fw pi-calendar',
                     label: 'Resumenes Diarios',
                     command: () => { navigate('/resumenesdiarios') }
                  }
               ]
            }
         ]
      },
      {
         idmodulo: '7',
         label: 'Events',
         icon: 'pi pi-fw pi-calendar',
         items: [
            {
               idmodulo: '8',
               label: 'Edit',
               icon: 'pi pi-fw pi-pencil',
               items: [
                  {
                     id: '12',
                     label: 'Save',
                     icon: 'pi pi-fw pi-calendar-plus'
                  },
                  {
                     id: '13',
                     label: 'Delete',
                     icon: 'pi pi-fw pi-calendar-minus'
                  },

               ]
            },
            {
               idmodulo: '9',
               label: 'Archieve',
               icon: 'pi pi-fw pi-calendar-times',
               items: [
                  {
                     id: '14',
                     label: 'Remove',
                     icon: 'pi pi-fw pi-calendar-minus'
                  }
               ]
            }
         ]
      },
      {
         label: 'Logout',
         icon: 'pi pi-fw pi-power-off'
      }
   ];


   //  const paginasConAcceso = fetchData.data;
   //  const menuFiltrado = items.filter(item => paginasConAcceso.includes(item.id));
   //const start = <img alt="logo" src="https://www.primefaces.org/primereact-v8/images/logo.png" widmoduloth={40} height={40} className="mr-2"></img>;


   const end = <InputText placeholder="Search" type="text" />;
   return (
      <div>
         <div className="card">
            <Menubar model={items} end={end} />
         </div>
         <Outlet />
      </div>
   );
}
