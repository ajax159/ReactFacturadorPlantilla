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
import { AutoComplete } from "primereact/autocomplete";
import './styles/Asignaciones.css';
import 'primeicons/primeicons.css';
import React, { useEffect, useState, useCallback } from 'react'
import apiSource from '../apiSource.js';
let idCajaGlobal = '0';
let apiroute = apiSource();


const useBuscarc = () => {
  const [datos, setDatos] = useState([]);
  const idcaj = idCajaGlobal
  const buscarC = async (idCaja, event, nomBusc) => {
    fetch(`${apiroute}${idCaja}${idcaj}`)
      .then((response) => response.json())
      .then((cjusuariobusc) => {
        const atrJson = nomBusc;
        let _fildDatos;
        _fildDatos = cjusuariobusc.filter((data) => {
          return data[atrJson].toLowerCase().includes(event.query.toLowerCase());
        });
        setDatos(_fildDatos);
      })
      .catch((error) => {
        console.error('Error data:', error);
      });
  };
  return {
    datos,
    buscarC
  }
}

const useSelectCajas = () => {
  const toast = useRef(null);
  const [idCajaData, setIdCajaData] = useState({});
  const [cajaDato, setcajaDato] = useState([]);
  const [selectedDato, setSelectedDato] = useState(null);
  const getCajadata = async (urlApi, idItem, cajId) => {
    idCajaGlobal = cajId
    try {
      const apiCaja = await fetch(`${apiroute}${urlApi}${cajId}`);
      const cjdata = await apiCaja.json();
      setcajaDato(cjdata);
      const newIdCajaData = cjdata.reduce((map, item) => {
        map[item[idItem]] = item[idItem];
        return map;
      }, {});
      setIdCajaData(newIdCajaData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const agregarRelacion = (atrId, atrLabel, apiEp,urlApi, idItem) => {
    const datId = selectedDato[atrId];
    const cajId = idCajaGlobal
    const data = {
      [atrLabel]: datId,
      facCajaCajId: cajId,
      createdBy: 1,
      gecId: '1',
      empId: '1',
      glbEstadoEstId: 1
    }
    fetch(`${apiroute}${apiEp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setSelectedDato(null);
          getCajadata(urlApi, idItem, cajId); 
          toast.current.show({ severity: 'success', summary: 'Asignacion', detail: 'Usuario agregado Correctamente' });
        } else {
          response.json().then((data) => {
            //const servidor = data.errors[0].defaultMessage;
            toast.current.show({ severity: 'info', summary: 'Error', detail: 'Debe seleccionar una caja' });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const eliminarCajaData = (idCaja, cjapi, cjIdData, cjuapi) => {
    const cajId = idCajaGlobal;
    const accept = () => {
      fetch(`${apiroute}${cjapi}${idCaja}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            getCajadata(cjuapi, cjIdData, cajId);
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
      message: '¿Eliminar usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: 'left',
      accept
    });
  }
  const accionCaja = (rowData, cjIdData, cjapi, cjuapi) => {
    const iduser = rowData[cjIdData];
    const idCaja = idCajaData[iduser];
    return <Button id={idCaja} onClick={() => eliminarCajaData(idCaja, cjapi, cjIdData, cjuapi)} icon="pi pi-times" text severity="danger" aria-label="Eliminar" style={{ paddingTop: '0px', paddingBottom: '0px' }} />
  };
  return {
    idCajaData,
    setIdCajaData,
    cajaDato,
    setcajaDato,
    getCajadata,
    accionCaja,
    eliminarCajaData,
    selectedDato,
    setSelectedDato,
    agregarRelacion,
    toast
  }
}

const Asignacion = () => {
  const cajaUserB = useBuscarc()
  const cajaSerB = useBuscarc()
  const cajaTdocB = useBuscarc()
  const admCajauser = useSelectCajas()
  const admCajaser = useSelectCajas()
  const admCajadoc = useSelectCajas()

  const [cajasData, setCajasData] = useState([]);
  const [gecid, setGecid] = useState('0');
  const [empid, setEmpid] = useState('0');
  const [buttonIcon, setButtonIcon] = useState('pi pi-plus');
  const [buttonestado, setButtonEstado] = useState('crear');
  const [nomcaja, setNomCaja] = useState('Caja');


  const fetchData = useCallback(async () => {
    const newGecid = document.getElementById('gecid').value;
    const newEmpid = document.getElementById('empid').value;
    setGecid(newGecid);
    setEmpid(newEmpid);
    try {
      const response = await fetch(`${apiroute}/caja/listar/${gecid}/${empid}`);
      const data = await response.json();
      setCajasData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [gecid, empid]); 
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
    fetch(`${apiroute}/caja/${idcaja}`, {
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

    fetch(`${apiroute}/caja/crear`, {
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
    fetchData();
  }, [fetchData]);

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
      <input type="hidden" id='cajaid' name='cajaid' value='4' />
      <input type="hidden" value='1' id='iduser' name='iduser' />
      <input type="hidden" id='idusuario' name='idusuario' />
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
                    <SplitButton className='w-full' label={data.cajDescripcion} icon="pi pi-box" 
                    onClick={() => {admCajauser.getCajadata('/cajausuario/usuario?idcaja=','cjuId',data.cajId);admCajaser.getCajadata('/cajaserie/serie?idcaja=','cjsId',data.cajId);admCajadoc.getCajadata('/cajadocumento/documento?idcaja=','cjdId',data.cajId);setNomCaja(data.cajDescripcion) }}
                    model={items(data.cajDescripcion, data.cajId)} severity="secondary" raised text />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id='Segmento2' className='pl-6 w-full'>
            <Fieldset legend={nomcaja}>
              <div className='flex'>
                <div className='w-full m-2'>
                  <Card title="Usuarios" color='blue'>
                    <div className='flex'>
                    <Toast ref={admCajauser.toast} />
                      <AutoComplete
                        field="usuNombrecompleto"
                        value={admCajauser.selectedDato}
                        suggestions={cajaUserB.datos}
                        completeMethod={(event) => cajaUserB.buscarC(`/cajausuario/usuarionot?idcaja=`, event, 'usuNombrecompleto')}
                        onChange={(e) => admCajauser.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => admCajauser.agregarRelacion('usuId','facUsuarioUsuId','/cajausuario/crear','/cajausuario/usuario?idcaja=','cjuId')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajauser.cajaDato} className="w-auto">
                      <Column field="usuNombrecompleto" header="Usuarios"></Column>
                      <Column body={(rowData) => admCajauser.accionCaja(rowData, 'cjuId', '/cajausuario/','/cajausuario/usuario?idcaja=')} />
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Serie">
                    <div className='flex'>
                    <Toast ref={admCajaser.toast} />
                      <AutoComplete
                        field="serSerie"
                        value={admCajaser.selectedDato}
                        suggestions={cajaSerB.datos}
                        completeMethod={(event) => cajaSerB.buscarC(`/cajaserie/notserie?idcaja=`, event, 'serSerie')}
                        onChange={(e) => admCajaser.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => admCajaser.agregarRelacion('serId','facSerieSerId','/cajaserie/crear','/cajaserie/serie?idcaja=', 'cjsId')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajaser.cajaDato}>
                      <Column field="serSerie" header="Serie"></Column>
                      <Column body={(rowData) => admCajaser.accionCaja(rowData, 'cjsId', '/cajaserie/','/cajaserie/serie?idcaja=')} />
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Tipo Documento">
                    <div className='flex'>
                    <Toast ref={admCajadoc.toast} />
                      <AutoComplete
                        field="tpdDescripcion"
                        value={admCajadoc.selectedDato}
                        suggestions={cajaTdocB.datos}
                        completeMethod={(event) => cajaTdocB.buscarC(`/cajadocumento/notdocumento?idcaja=`, event, 'tpdDescripcion')}
                        onChange={(e) => admCajadoc.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => admCajadoc.agregarRelacion('tpdId','facTipoDocumentoTpdId','/cajadocumento/crear','/cajadocumento/documento?idcaja=', 'cjdId')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajadoc.cajaDato}>
                      <Column field="tpdDescripcion" header="Documento" ></Column>
                      <Column body={(rowData) => admCajadoc.accionCaja(rowData, 'cjdId', '/cajadocumento/','/cajadocumento/documento?idcaja=')} />
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

