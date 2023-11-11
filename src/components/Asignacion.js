import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { confirmPopup } from 'primereact/confirmpopup';
import './styles/Asignaciones.css';
import 'primeicons/primeicons.css';

import React, { useEffect, useState } from 'react'

const Asignacion = () => {

  const [cajasData, setCajasData] = useState([]);
  const [gecid, setGecid] = useState('0');
  const [empid, setEmpid] = useState('0');
  const [cajaUsuario, setcajaUsuario] = useState([]);
  const [cajaDocumento, setCajaDocumento] = useState([]);
  const [cajaSerie, setCajaSerie] = useState([]);
  const [buttonIcon, setButtonIcon] = useState('pi pi-plus');
  const [buttonestado, setButtonEstado] = useState('crear');
  const [idCajauserMap, setIdCajauserMap] = useState({});



  const handleClick = async (cajId) => {
    const idCaja = cajId;
    document.getElementById('cajaid').value = cajId
    try {
      const apiCajaUsuario = await fetch(`http://localhost:5000/cajausuario/usuario?idcaja=${idCaja}`);
      const cjusuario = await apiCajaUsuario.json();
      const newIdCajauserMap = { ...idCajauserMap };
      cjusuario.forEach((item) => {
        const iduser = item['cjuId'];
        newIdCajauserMap[iduser] = iduser;
        return item;
      });
    
      setIdCajauserMap(newIdCajauserMap);
      setcajaUsuario(cjusuario)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const apiCajaDocumento = await fetch(`http://localhost:5000/cajadocumento/documento?idcaja=${idCaja}`);
      const cjdocumento = await apiCajaDocumento.json();
      setCajaDocumento(cjdocumento);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const apiCajaSerie = await fetch(`http://localhost:5000/cajaserie/listarserie/${idCaja}`);
      const cjserie = await apiCajaSerie.json();
      setCajaSerie(cjserie.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const eliminarCajaUsuario = (idCaja) => {
    console.log(idCaja);
    const accept = () => {
      fetch(`http://localhost:5000/cajausuario/${idCaja}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            // handleClick();
            document.getElementById('cajaid').value = '';
            toast.current.show({ severity: 'info', summary: 'Eliminado', detail: 'Usuario eliminado correctamente', life: 3000 });
          } else {
            response.json().then((data) => {
              const servidor = data.errors[0].defaultMessage;
              toast.current.show({ severity: 'info', summary: 'Error', detail: servidor });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }
    confirmDialog({
      message: '¿Quieres eliminar este usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: 'left',
      accept
  });
  }

  const actionBodyTemplate = (rowData) => {
    const iduser = rowData['cjuId'];
    const idCaja = idCajauserMap[iduser];
    return <Button id={idCaja} onClick={() => eliminarCajaUsuario(idCaja)} icon="pi pi-times" text severity="danger" aria-label="Eliminar" style={{ paddingTop: '0px', paddingBottom: '0px' }} />
  };

  const getInputs = () => {
    const newGecid = document.getElementById('gecid').value;
    const newEmpid = document.getElementById('empid').value;
    setGecid(newGecid);
    setEmpid(newEmpid);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/caja/listar/${gecid}/${empid}`);
      const data = await response.json();
      setCajasData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const accionCaja = () => {
    const cajaDes = document.getElementById('buscarcaja').value;
    const cajaid = document.getElementById('cajaid').value;
    if (buttonestado === 'crear') {
      if (cajaDes !== '') {
        nuevaCaja();
      } else {
        toast.current.show({ severity: 'warn', summary: 'Campo vacio', detail: 'El campo Caja tiene que estar lleno' });
      }
    } else {
      if (cajaid && cajaDes !== '') {
        actualizarCaja();
      } else {
        toast.current.show({ severity: 'warn', summary: 'Campo vacio', detail: 'El campo Caja tiene que estar lleno' });
      }

    }
  }
  const actualizarCaja = () => {
    const data = {
      cajDescripcion: document.getElementById('buscarcaja').value,
      updatedBy: document.getElementById('iduser').value,
    };
    const idcaja = document.getElementById('cajaid').value
    console.log(buttonestado);
    fetch(`http://localhost:5000/caja/${idcaja}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          limpiarCaja();
          setButtonEstado('crear');
          toast.current.show({ severity: 'info', summary: 'Actualizado', detail: 'Caja Actualizada Correctamente' });
        } else {
          response.json().then((data) => {
            const servidor = data.errors[0].defaultMessage;
            toast.current.show({ severity: 'info', summary: 'Error', detail: servidor });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const nuevaCaja = () => {
    const data = {
      cajDescripcion: document.getElementById('buscarcaja').value,
      createdBy: document.getElementById('iduser').value,
      gecId: document.getElementById('gecid').value,
      empId: document.getElementById('empid').value,
      glbEstadoEstId: 1
    }

    fetch(`http://localhost:5000/caja/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          limpiarCaja();
          toast.current.show({ severity: 'success', summary: 'Creada', detail: 'Caja Creada Correctamente' });
        } else {
          response.json().then((data) => {
            const servidor = data.errors[0].defaultMessage;
            toast.current.show({ severity: 'info', summary: 'Error', detail: servidor });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const limpiarCaja = () => {
    fetchData();
    document.getElementById('cajaid').value = '';
    document.getElementById('buscarcaja').value = '';
    setButtonIcon('pi pi-plus');
  }


  useEffect(() => {
    getInputs();
  }, []);

  useEffect(() => {
    fetchData();
  }, [gecid, empid]);
  //_--------------------------------------------------------------------------------}
  const toast = useRef(null);
  const items = (cajDescripcion, cajId) => [
    {
      label: 'Actualizar',
      icon: 'pi pi-refresh',
      command: (event) => {
        const cajaj = cajId;
        console.log(cajaj);
        document.getElementById('buscarcaja').value = cajDescripcion;
        document.getElementById('cajaid').value = cajaj;
        setButtonIcon('pi pi-pencil');
        setButtonEstado('editar');
      }
    },
    {
      label: 'Bloquear',
      icon: 'pi pi-times',
      command: () => {
        toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
      }
    }
  ];

  return (
    <div>
      <ConfirmDialog />
      <input type="hidden" value="1" id='gecid' name='gecid' />
      <input type="hidden" value="1" id='empid' name='empid' />
      <input type="hidden" id='cajaid' name='cajaid' />
      <input type="hidden" value='1' id='iduser' name='iduser' />
      <Panel header="Asignacion de Documentos" className='px-1 pt-2' toggleable>
        <div id="Contenedor" className="flex">
          <div id='Segmento1' className='flex-column' style={{ maxWidth: '260px' }}>
            <div className="p-inputgroup flex-1">
              <InputText placeholder="Caja ..." className='buscarcaja' id="buscarcaja" />
              <Button id="opcaja" onClick={accionCaja} icon={buttonIcon} estado={buttonestado} className="p-button-warning buscarcaja" raised />
            </div>
            <Divider />
            <div id='cajas'>
              {cajasData.map((data) => (
                <div className="pb-2" key={data.cajId} id="div">
                  <div className="card flex justify-content-center" id={data.cajId}>
                    <Toast ref={toast}></Toast>
                    <SplitButton className='w-full' label={data.cajDescripcion} icon="pi pi-box" onClick={() => handleClick(data.cajId)} model={items(data.cajDescripcion, data.cajId)} severity="secondary" raised text />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id='Segmento2' className='pl-6 w-full'>
            <Fieldset legend="Caja 1">
              <div className='flex'>
                <div className='w-full m-2'>
                  <Card title="Usuarios" color='blue'>
                    <span className="p-input-icon-left w-auto">
                      <i className="pi pi-search" />
                      <InputText placeholder="Agregar" className='flex w-auto' />
                    </span>
                    <DataTable value={cajaUsuario} className="w-auto">
                      <Column field="usuNombrecompleto" header="Usuarios"></Column>
                      <Column body={actionBodyTemplate} />
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Serie">
                    <span className="p-input-icon-left">
                      <i className="pi pi-search" />
                      <InputText placeholder="Agregar" />
                    </span>
                    <DataTable value={cajaSerie}>
                      <Column field="serSerie" header="Serie"></Column>
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Tipo Documento">
                    <span className="p-input-icon-left">
                      <i className="pi pi-search" />
                      <InputText placeholder="Agregar" />
                    </span>
                    <DataTable value={cajaDocumento}>
                      <Column field="tpdDescripcion" header="Documento" ></Column>
                    </DataTable>
                  </Card>
                </div>
              </div>
            </Fieldset>
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default Asignacion

