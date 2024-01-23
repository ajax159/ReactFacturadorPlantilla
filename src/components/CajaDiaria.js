import React, { useEffect, useState } from 'react'
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DateRangePicker } from 'rsuite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import EditIcon from '@mui/icons-material/Edit';
import './styles/CajaDiaria.css';

let apiroute = 'https://serviciofact.mercelab.com'

const useItems = () => {
    const [itemDato, setItemDato] = useState([]);
    const [itemDatoCaj, setItemDatoCaj] = useState([]);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');

    const getItems = async (urlApirRes,urlApirCaj) => {
        try {
          const apiItemsResp = await fetch(`${apiroute}${urlApirRes}`);
          const apiItemsCaj = await fetch(`${apiroute}${urlApirCaj}`);
          const itdataresp = await apiItemsResp.json();
          const itdatacaj = await apiItemsCaj.json();
          setItemDato(itdataresp.data.facUsuario);
          setItemDatoCaj(itdatacaj.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }

          setPosition('top')
          setVisible(true)
      }
      return {
        itemDato,
        itemDatoCaj,
        getItems,
        visible,
        position,
        setVisible,
        setPosition
      }
}

const CajaDiaria = () => {
    const varItems = useItems()
    const headerPanel = (
        <div className='prueba'>
            <h3>Caja Diaria</h3>
        </div>
    );
    //////////////////////////////////////////////////////////
    const [datos, setDatos] = useState([]);
    const [date, setDate] = useState([]);
    const [selectedDato, setSelectedDato] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [selectedResp, setSelectedResp] = useState(null);
    const [selectedCaj, setSelectedCaj] = useState(null);
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
    const getFetch = async (e) => {
        const startDate = e[0].toISOString().slice(0, 10);
        const endDate = e[1].toISOString().slice(0, 10);
        let url = `https://serviciofact.mercelab.com/movimientocaja/listarmovcaja/1/1?fechainicio=${startDate}&fechafin=${endDate}`;
        const response = await fetch(url);
        let responseJSON = await response.json();
        setDatos(responseJSON);
    }
    const fetchData = async () => {
        const startDate = new Date().toISOString().slice(0, 10);
        const endDate = new Date().toISOString().slice(0, 10);;
        let url = `https://serviciofact.mercelab.com/movimientocaja/listarmovcaja/1/1?fechainicio=${startDate}&fechafin=${endDate}`;
        const response = await fetch(url);
        let responseJSON = await response.json();
        setDatos(responseJSON);
    };
    useEffect(() => {
        fetchData();
    }, [date]);
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
                        <Button label='Aperturar Caja' onClick={() => { varItems.getItems('/usuario/listar', '/caja/listar/1/1') }}></Button>
                    </div>
                </div>
                <div className="flex align-center" style={{ height: '100%' }}>
                    <DateRangePicker size="lg" placement='leftStart' onOk={e => getFetch(e)} onClean={() => fetchData()} onShortcutClick={e => getFetch(e.value)} />
                </div>
            </div>
        );
    };



    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />;
    };


    const actionBodyTemplate = () => {
        return (
            <div className="flex gap-1 justify-content-between align-items-center">
                <Button icon={<EditIcon fontSize="small" />} aria-label="Editar" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon="pi pi-calculator" severity="warning" aria-label="Recalcular" size='small' style={{ width: '30px', height: '32px' }} />
                <Button icon="pi pi-times" severity="danger" aria-label="Eliminar" style={{ width: '30px', height: '32px' }} />
            </div>
        );
    };
    const header = renderHeader();
    /////////////////////////////////////////////////////////
    const footerContent = (
        <div>
            <Button label="Aperturar" icon="pi pi-check" onClick={() => {aperturarCaja();varItems.setVisible(false);cleanForm()}} autoFocus />
            <Button label="Cancelar" icon="pi pi-times" onClick={() => {varItems.setVisible(false);cleanForm()}} className="p-button-text" />
        </div>
    );

    useEffect(() => {
        const today = new Date();
        setDate(today)
    }, [])

    const cleanForm = () =>{
        setSelectedResp(null)
        setSelectedCaj(null)
    }
    ///////////////////////////////////////////////////////
    const toast = React.useRef(null);
    const aperturarCaja = () => {
        const fechaApertura = date;

        fetch(`${apiroute}/movimientocaja/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "faccajacajId": selectedCaj.cajId,
                "mcaTipomovimiento": 1,
                "mcaFechaapertura": fechaApertura,
                "mcaTotal": document.getElementById('impinicial').value,
                "mcaMoneda": 1,
                "glbEstadoEstId": 1,
                "createdBy": selectedResp.usuId,
                "gecId": 1,
                "empId": 1
            })
        }).then(response => {
            if (response.ok) {
                fetchData();
                response.json().then(data => {
                    guardarMov(data.data.mcaId, data.data.mcaTipomovimiento, data.data.mcaTotal);
                });
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Caja Aperturada' });
            }else{
console.log('error')
            }
        })
    }

    const guardarMov = (idMov, idTip, monT) => {
        fetch(`${apiroute}/movimientodetalle/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "facMovimientocajamcaId": idMov,
                "mdeTipomovimiento": idTip,
                "mdeMonto": monT,
                "glbEstadoEstId": 1,
                "createdBy": selectedResp.usuId,
                "gecId": 1,
                "empId": 1
            })
        })
    }
    ///////////////////////////////////////////////////////

    return (
        <div>
            <Panel header={headerPanel} className='px-1 pt-2' toggleable>
                <div>
                    <Toast ref={toast}></Toast>
                    <Dialog
                        header="Aperturar Caja"
                        visible={varItems.visible}
                        position={varItems.position}
                        style={{ minWidth: '50vw' }}
                        onHide={() => {
                            varItems.setVisible(false);
                            cleanForm();
                        }}
                        footer={footerContent}
                        draggable={false}
                        resizable={false}
                    >
                        <div className='grid grid-cols-3 gap-1 sm:grid-cols-2 md:grid-cols-3'>
                            <div className='w-full h-full'>
                                <span className="p-float-label mb-3">
                                    <Calendar id="fechaapertura" locale='es' value={date} dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" mask="99/99/9999" disabled />
                                </span>
                                <div>
                                    <Dropdown placeholder="Sucursal" className="w-full" disabled />
                                </div>
                            </div>
                            <div className='w-full h-full'>
                                <div className="mb-3">
                                    <Dropdown placeholder="Responsable" value={selectedResp} onChange={(e) => setSelectedResp(e.value)} options={varItems.itemDato} optionLabel="usuNombrecompleto" className="w-full" />
                                </div>
                                <div>
                                    <Dropdown placeholder="Caja" value={selectedCaj} onChange={(e) => setSelectedCaj(e.value)} options={varItems.itemDatoCaj} optionLabel="cajDescripcion" className="w-full" />
                                </div>
                            </div>
                            <div className='w-full h-full'>
                                <div className="mb-3">
                                    <Dropdown placeholder="Moneda" className="w-full" />
                                </div>
                                <span className="p-float-label">
                                    <InputText id="impinicial" />
                                    <label>Imp Inicial</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <DataTable
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
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="mcaFechaapertura" header="Apertura" sortable dataType="date" style={{ minWidth: '10rem' }}  />
                        <Column field="mcaFechacierre" header="Cierre" sortable filterField="cierre" dataType="date" style={{ minWidth: '10rem' }} />
                        <Column field="empId" header="Sucursal" sortable style={{ minWidth: '14rem' }} />
                        <Column field="cajDescripcion" header="Caja" sortable style={{ minWidth: '10rem' }} />
                        <Column field="usuNombrecompleto" header="Encargado" sortable style={{ minWidth: '12rem' }} />
                        <Column field="moneda" header="Moneda" sortable style={{ minWidth: '9rem' }} />
                        <Column field="estado" header="Estado" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '9rem' }} body={statusBodyTemplate} />
                        <Column headerStyle={{ minWidth: '4rem' }} body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </Panel>
        </div>
    )
}

export default CajaDiaria