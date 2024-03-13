import React, { useEffect, useState, useContext } from 'react'
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import ButtonMui from '@mui/material/Button';
import { Dialog } from 'primereact/dialog';
import { DateRangePicker } from 'rsuite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import EditIcon from '@mui/icons-material/Edit';
import CalculateIcon from '@mui/icons-material/Calculate';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import './styles/CajaDiaria.css';
import RendiciondeCaja from './RendiciondeCaja.js';
import { IngresoContext } from './RendicionCaja/useEnviarIngreso.js';
import { AperturarCaja } from './AperturarCaja.js';
import { useListarCajaStore } from './AperturarCaja/stores/listarcajaStore.js';
import { useMovimientocaja } from '../hooks/useMovimientocaja.js';

const CajaDiaria = () => {
    const { setOpen, dialog, open } = AperturarCaja();
    const listarMovimiento = useMovimientocaja();
    const enviarItems = useContext(IngresoContext);
    const [visibleRend, setVisibleRend] = useState(false);
    const [selectedDato, setSelectedDato] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const datos = useListarCajaStore(state => state.datos);
    useEffect(() => {
        if (open === false) {
            listarMovimiento.fetchData();
        }
        //eslint-disable-next-line
    }, []);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const getSeverity = (status) => {
        switch (status) {
            case 'CERRADO':
                return 'danger';

            case 'ABIERTO':
                return 'success';
            default:
        }
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
            <div className="flex flex-wrap gap-2 justify-between align-center">
                <div className="flex align-center">
                    <div>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                        </span>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <Button label='Aperturar Caja' onClick={() => setOpen(true)}></Button>
                    </div>
                </div>
                <div className="flex align-center" style={{ height: '100%' }}>
                    <DateRangePicker format="dd/MM/yyyy" character=" – " size="lg" placement='leftStart' onOk={e => listarMovimiento.fetchData(e)} onClean={() => listarMovimiento.fetchData()} onShortcutClick={e => listarMovimiento.fetchData(e.value)} />
                </div>
            </div>
        );
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />;
    };
    const actionButtons = (rowData) => {
        return (
            <div className="flex gap-1 justify-content-between align-items-center">
                <Button icon={<EditIcon fontSize="small" />} aria-label="Editar" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon={<CalculateIcon fontSize="small" />} onClick={(event) => { setVisibleRend(true); enviarItems.setMovId(rowData.mcaId) }} severity="warning" aria-label="Recalcular" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon={<DisabledByDefaultIcon fontSize="small" />} severity="danger" aria-label="Eliminar" style={{ width: '30px', height: '32px' }} />
            </div>
        );
    };
    const header = renderHeader();
    const toast = React.useRef(null);
    const headerRend = (
        <div className='flex'>
            <div className=' mr-3'>
                <div id="pr_id_4_header" className="p-dialog-title" data-pc-section="headertitle">Rendicion de Caja</div>
            </div>
            <div className='mr-3'>
                <ButtonMui variant="contained" color="success" size="small" onClick={enviarItems.print} >
                    Enviar
                </ButtonMui>
            </div>
            <div className='mr-3'>
                <ButtonMui variant="contained" color="error" size="small">
                    Cancelar
                </ButtonMui>
            </div>
        </div>
    )


    return (
        <div>
            <Panel header='Caja Diaria' className='px-1 pt-2' toggleable>
                <div>
                    <Toast ref={toast}></Toast>
                    {dialog}
                    <Dialog visible={visibleRend}
                        onHide={() => {
                            setVisibleRend(false);
                            enviarItems.clearForm();
                            enviarItems.setActiveIndex(0);
                        }}
                        header={headerRend}
                        style={{ minWidth: '70vw' }}
                        draggable={false}
                        resizable={false}
                    >
                        <RendiciondeCaja />
                    </Dialog>

                    <DataTable
                        style={{ width: '100%' }}
                        value={datos}
                        size='small'
                        paginator
                        header={header}
                        rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="mcaId"
                        selectionMode="checkbox"
                        selection={selectedDato}
                        onSelectionChange={(e) => setSelectedDato(e.value)}
                        filters={filters}
                        filterDisplay="menu"
                        globalFilterFields={['empId', 'cajDescripcion', 'usuNombrecompleto', 'mcaFechaapertura']}
                        emptyMessage="No customers found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column hidden field="mcaId" header="Id" sortable style={{ minWidth: '14rem', display: 'hidden' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="mcaFechaapertura" header="Apertura" sortable dataType="date" style={{ minWidth: '8rem' }} />
                        <Column field="mcaFechacierre" header="Cierre" sortable filterField="cierre" dataType="date" style={{ minWidth: '8rem' }} />
                        <Column field="empId" header="Sucursal" sortable style={{ minWidth: '14rem' }} />
                        <Column field="cajDescripcion" header="Caja" sortable style={{ minWidth: '10rem' }} />
                        <Column field="usuNombrecompleto" header="Encargado" sortable style={{ minWidth: '12rem' }} />
                        <Column field="moneda" header="Moneda" sortable style={{ minWidth: '9rem' }} />
                        <Column field="estado" header="Estado" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '9rem' }} body={statusBodyTemplate} />
                        <Column headerStyle={{ minWidth: '4rem' }} body={(rowData) => actionButtons(rowData)} />
                    </DataTable>
                </div>
            </Panel>
        </div>
    )
}

export default CajaDiaria