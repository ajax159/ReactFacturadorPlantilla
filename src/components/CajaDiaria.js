import React, { useEffect, useState } from 'react'
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { addLocale } from 'primereact/api';
//import { CustomerService } from './service/CustomerService';
import './styles/CajaDiaria.css';

const CajaDiaria = () => {
    //let apiroute = 'https://serviciofact.mercelab.com'

    const headerPanel = (
        <div className='prueba'>
            <h3>Caja Diaria</h3>
        </div>
    );


    //////////////////////////////////////////////////////////
    const [datos, setDatos] = useState([]);
    const [selectedDato, setSelectedDato] = useState([]);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['CERRADO', 'ABIERTO']);

    const getSeverity = (status) => {
        switch (status) {
            case 'CERRADO':
                return 'danger';

            case 'ABIERTO':
                return 'success';
            default:
        }
    };
    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });
    useEffect(() => {
        const getFetch = async () => {
            const response = await fetch('https://serviciofact.mercelab.com/movimientocaja/listarmovcaja/1/1');
            let responseJSON = await response.json();
            responseJSON = responseJSON?.map((box) => ({
                ...box,
                apertura: new Date(`${box.mcaFechaapertura} UTC-5`),
                cierre: new Date(`${box.mcaFechacierre} UTC-5`)
            }));
            setDatos(responseJSON);
        }
        getFetch()
        initFilters();
    }, []);

    const formatDate = (value) => {
        return value.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const formatDatecierre = (value) => {
        return value.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                </span>
                <Button label='Aperturar Caja'></Button>
            </div>
        );
    };
    const dateBodyTemplate = ({ apertura }) => {
        return formatDate(apertura);
    };
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            apertura: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            cierre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            empId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            cajDescripcion: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            usuNombrecompleto: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            moneda: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            estado: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
        });
    };
    const dateBodyTemplatecierre = ({ cierre }) => {
        return formatDatecierre(cierre);
    };
    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} locale='es' dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" mask="99/99/9999" />;
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />;
    };
    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Seleccionar" className="p-column-filter" showClear />;
    };
    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
    const actionBodyTemplate = () => {
        return (
            <div className="flex gap-1 justify-content-between align-items-center">
                <Button icon="pi pi-pencil" aria-label="Editar" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon="pi pi-calculator" severity="warning" aria-label="Recalcular" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon="pi pi-times" severity="danger" aria-label="Eliminar" style={{ width: '30px', height: '32px' }} />
            </div>
        );
    };
    const header = renderHeader();
    /////////////////////////////////////////////////////////
    return (
        <div>
            <Panel header={headerPanel} className='px-1 pt-2' toggleable >
                <div>
                    <DataTable value={datos} size='small' paginator header={header} rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]} dataKey="mcaId" selectionMode="checkbox" selection={selectedDato} onSelectionChange={(e) => setSelectedDato(e.value)}
                        filters={filters} filterDisplay="menu" globalFilterFields={['empId', 'cajDescripcion', 'usuNombrecompleto', 'mcaFechaapertura']}
                        emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="apertura" header="Apertura" sortable filterField="apertura" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                        <Column field="cierre" header="Cierre" sortable filterField="cierre" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplatecierre} filter filterElement={dateFilterTemplate} />
                        <Column field="empId" header="Sucursal" sortable filter filterPlaceholder="Buscar por sucursal" style={{ minWidth: '14rem' }} />
                        <Column field="cajDescripcion" header="Caja" sortable filter filterPlaceholder="Buscar por caja" style={{ minWidth: '10rem' }} />
                        <Column field="usuNombrecompleto" header="Encargado" sortable filter filterPlaceholder="Buscar por encargado" style={{ minWidth: '12rem' }} />
                        <Column field="moneda" header="Moneda" sortable filter filterPlaceholder="Buscar por moneda" style={{ minWidth: '9rem' }} />
                        <Column field="estado" header="Estado" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '9rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                        <Column headerStyle={{ minWidth: '4rem' }} body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </Panel>
        </div>
    )
}

export default CajaDiaria