import React from 'react'
import { useState} from 'react';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { FilterMatchMode} from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
// import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import './styles/Listarventas.css';
// import { CustomerService } from './service/CustomerService';
const forminput = {
    maxHeight: 14,
    fontSize: '9px'
  };

const ListarVentas = () => {
    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    // const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
            
            default:
        }
    };

    // useEffect(() => {
    //     CustomerService.getCustomersMedium().then((data) => {
    //         setCustomers(getCustomers(data));
    //         setLoading(false);
    //     });
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const getCustomers = (data) => {
    //     return [...(data || [])].map((d) => {
    //         d.date = new Date(d.date);

    //         return d;
    //     });
    // };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" style={forminput}/>
                </span>
            </div>
        );
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
    };


    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear  />
        );
    };

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    const header = renderHeader();
  return (
    <div className='px-1 py-2'>
        <Card title='Ventas'>
                <DataTable size='small' value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={false}
                    globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
                <Column style={{fontSize:'12px'}} field="item" header="Item" />
                <Column style={{paddingRight:1,fontSize:'12px'}} field="ruc" header="RUC" filter filterPlaceholder="Buscar por RUC"  />
                <Column style={{paddingRight:1,fontSize:'12px'}} field="cliente" header="Cliente" filter filterPlaceholder="Buscar por Cliente"  />
                <Column style={{paddingRight:1,fontSize:'12px'}} field="tdoc" header="T. Doc" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}  body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Serie" filterField="serie.name"  body={countryBodyTemplate} filter filterPlaceholder="Serie" />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Numero" filterField="numero.name"  body={countryBodyTemplate} filter filterPlaceholder="Numero" />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Anticipo" filterField="anticipo.name"  body={countryBodyTemplate} filter filterPlaceholder="Anticipo" />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Moneda" filterField="moneda.name"  body={countryBodyTemplate} filter filterPlaceholder="Moneda" />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Fecha Emision" filterField="fecha.name"  body={countryBodyTemplate} filter filterPlaceholder="Fecha" />
                <Column style={{paddingRight:1,fontSize:'12px'}} header="Importe" filterField="importe.name"  body={countryBodyTemplate} filter filterPlaceholder="Importe" />
                <Column style={{paddingRight:1,fontSize:'12px'}} field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}  body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column style={{paddingRight:1,fontSize:'12px'}} field="verified" header="Verified" dataType="boolean"  body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
            </DataTable>
        </Card>
    </div>
  )
}

export default ListarVentas