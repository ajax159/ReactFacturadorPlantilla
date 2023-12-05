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
import React, { useEffect, useState } from 'react'
let idCajaGlobal = '0';

const useBuscarc = () => {
  const [datos, setDatos] = useState([]);
  const idcaj = idCajaGlobal
  const buscarC = async (idCaja, event, nomBusc) => {
    fetch(`${idCaja}${idcaj}`)
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

const useDatosC = () => {
  const [selectedDato, setSelectedDato] = useState(null);
  const agregarRelacion = (atrId, atrLabel, apiEp) => {
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
    fetch(`${apiEp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //handleClick(cajId);
          setSelectedDato(null);
          Toast.current.show({ severity: 'success', summary: 'Creada', detail: 'Usuario agregado Correctamente' });
        } else {
          response.json().then((data) => {
            const servidor = data.errors[0].defaultMessage;
            Toast.current.show({ severity: 'info', summary: 'Error', detail: servidor });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    selectedDato,
    setSelectedDato,
    agregarRelacion
  }
}

const useSelectCajas = () => {
  const [idCajaData, setIdCajaData] = useState({});
  const [cajaDato, setcajaDato] = useState([]);
  const getCajadata = async (urlApi, idItem, cajId) => {
    idCajaGlobal = cajId
    try {
      const apiCaja = await fetch(`${urlApi}${cajId}`);
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
  const eliminarCajaData = (idCaja, cjapi) => {
    const cajId = idCajaGlobal
    const accept = () => {
      fetch(`${cjapi}${idCaja}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            getCajadata(cajId);
            Toast.current.show({ severity: 'info', summary: 'Eliminado', detail: 'Usuario eliminado correctamente', life: 3000 });
          } else {
            response.json().then((data) => {
              const servidor = data.errors[0].defaultMessage;
              Toast.current.show({ severity: 'info', summary: 'Error', detail: servidor });
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
  const accionCaja = (rowData, cjIdData, cjapi) => {
    const iduser = rowData[cjIdData];
    const idCaja = idCajaData[iduser];
    return <Button id={idCaja} onClick={() => eliminarCajaData(idCaja, cjapi)} icon="pi pi-times" text severity="danger" aria-label="Eliminar" style={{ paddingTop: '0px', paddingBottom: '0px' }} />
  };
  return {
    idCajaData,
    setIdCajaData,
    cajaDato,
    setcajaDato,
    getCajadata,
    accionCaja,
    eliminarCajaData
  }
}

const Asignacion = () => {
  const cajaUserB = useBuscarc()
  const cajaSerB = useBuscarc()
  const cajaTdocB = useBuscarc()
  const cajaUserD = useDatosC()
  const cajaSerD = useDatosC()
  const cajaTdocD = useDatosC()
  const admCajauser = useSelectCajas()
  const admCajaser = useSelectCajas()
  const admCajadoc = useSelectCajas()

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
    try {
      const apiCajaUsuario = await fetch(`http://localhost:5000/cajausuario/usuario?idcaja=${cajId}`);
      const cjusuario = await apiCajaUsuario.json();
      setcajaUsuario(cjusuario);
      const newIdCajauserMap = cjusuario.reduce((map, item) => {
        map[item.cjuId] = item.cjuId;
        return map;
      }, {});
      setIdCajauserMap(newIdCajauserMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const apiCajaDocumento = await fetch(`http://localhost:5000/cajadocumento/documento?idcaja=${cajId}`);
      const cjdocumento = await apiCajaDocumento.json();
      setCajaDocumento(cjdocumento);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const apiCajaSerie = await fetch(`http://localhost:5000/cajaserie/serie?idcaja=${cajId}`);
      const cjserie = await apiCajaSerie.json();
      setCajaSerie(cjserie);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const eliminarCajaUsuario = (idCaja) => {
    const cajId = document.getElementById('cajaid').value;
    const accept = () => {
      fetch(`http://localhost:5000/cajausuario/${idCaja}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            handleClick(cajId);
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
                    onClick={() => {admCajauser.getCajadata('http://localhost:5000/cajausuario/usuario?idcaja=','cjuId',data.cajId);admCajaser.getCajadata('http://localhost:5000/cajaserie/serie?idcaja=','cjsId',data.cajId);admCajadoc.getCajadata('http://localhost:5000/cajadocumento/documento?idcaja=','cjdId',data.cajId) }}
                    model={items(data.cajDescripcion, data.cajId)} severity="secondary" raised text />
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
                    <div className='flex'>
                      <AutoComplete
                        field="usuNombrecompleto"
                        value={cajaUserD.selectedDato}
                        suggestions={cajaUserB.datos}
                        completeMethod={(event) => cajaUserB.buscarC(`http://localhost:5000/cajausuario/usuarionot?idcaja=`, event, 'usuNombrecompleto')}
                        onChange={(e) => cajaUserD.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => cajaUserD.agregarRelacion('usuId','facUsuarioUsuId','http://localhost:5000/cajausuario/crear')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajauser.cajaDato} className="w-auto">
                      <Column field="usuNombrecompleto" header="Usuarios"></Column>
                      <Column body={() => admCajauser.accionCaja('cjuId', 'http://localhost:5000/cajausuario/')} />
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Serie">
                    <div className='flex'>
                      <AutoComplete
                        field="serSerie"
                        value={cajaSerD.selectedDato}
                        suggestions={cajaSerB.datos}
                        completeMethod={(event) => cajaSerB.buscarC(`http://127.0.0.1:5000/cajaserie/notserie?idcaja=`, event, 'serSerie')}
                        onChange={(e) => cajaSerD.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => cajaSerD.agregarRelacion('serId','facSerieSerId','http://localhost:5000/cajaserie/crear')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajaser.cajaDato}>
                      <Column field="serSerie" header="Serie"></Column>
                      <Column body={() => admCajaser.accionCaja('cjsId', 'http://localhost:5000/cajaserie/')} />
                    </DataTable>
                  </Card>
                </div>
                <div className='w-full m-2'>
                  <Card title="Tipo Documento">
                    <div className='flex'>
                      <AutoComplete
                        field="tpdDescripcion"
                        value={cajaTdocD.selectedDato}
                        suggestions={cajaTdocB.datos}
                        completeMethod={(event) => cajaTdocB.buscarC(`http://127.0.0.1:5000/cajadocumento/notdocumento?idcaja=`, event, 'tpdDescripcion')}
                        onChange={(e) => cajaTdocD.setSelectedDato(e.value)}
                        dropdown className='pr-1' />
                      <Button onClick={() => cajaTdocD.agregarRelacion('tpdId','facTipoDocumentoTpdId','http://localhost:5000/cajadocumento/crear')} id='addusuario' icon="pi pi-arrow-circle-down" aria-label="Filter" severity='warning' />
                    </div>
                    <DataTable value={admCajadoc.cajaDato}>
                      <Column field="tpdDescripcion" header="Documento" ></Column>
                      <Column body={() => admCajadoc.accionCaja('cjdId', 'http://localhost:5000/cajadocumento/')} />
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

