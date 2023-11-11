import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Column } from 'primereact/column';
import './styles/Regventa.css';

export default function RegVentProd() {
  const forminput = {
    height: '26px',
    marginRight: '5px',
    maxWidth: '100px',
    fontSize: '12px'
  };
  const formfuente = {
    fontSize: '12px'
  }

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <InputText className='flex-1' style={{ height: '26px', marginRight: '5px' }} />
      <Dropdown placeholder="PEN" showClear style={{ height: '26px', marginRight: '5px' }} />
      <Button type="button" label='Agregar' rounded raised />
      <Button type="button" label='Nuevo' severity="success" rounded raised />
    </div>
  );
  return (
    <Panel header="Productos" className='px-1 py-2' toggleable >
      <div id="dataTableProd" className="card flex-1 pb-1">
        <Tooltip target=".export-buttons>button" position="bottom" />
        <DataTable header={header} tableStyle={{ minWidth: '50rem' }}>
          <Column field="item" header="Item" style={formfuente}></Column>
          <Column field="codigo" header="Codigo"style={formfuente}></Column>
          <Column field="um" header="UM"style={formfuente}></Column>
          <Column field="descripcion" header="Descripcion"style={formfuente}></Column>
          <Column field="observacion" header="Observacion"style={formfuente}></Column>
          <Column field="afect" header="Afect."style={formfuente}></Column>
          <Column field="cant" header="Cant."style={formfuente}></Column>
          <Column field="puni" header="P. Uni"style={formfuente}></Column>
          <Column field="igv" header="IGV"style={formfuente}></Column>
          <Column field="pvalor" header="P. Valor"style={formfuente}></Column>
          <Column field="ptotal" header="P. Total"style={formfuente}></Column>
          <Column field="" header="*"></Column>
        </DataTable>
      </div>
      <div className='flex'>
        <div className="flex gap-2" style={{ flexDirection: 'column' }}>
          <label htmlFor="tletras">Total Letras:</label>
          <InputText id="tletras" className='' style={{ height: '26px', marginRight: '5px', maxWidth: '300px' }} />
        </div>
        <div className="flex gap-2" style={{ flexDirection: 'column' }}>
          <label htmlFor="subtotal">Sub Total:</label>
          <InputText id="subtotal" className='' style={forminput} />
        </div>
        <div className="flex gap-2" style={{ flexDirection: 'column' }}>
          <label htmlFor="igv">IGV:</label>
          <InputText id="igv" className='' style={forminput} />
        </div>
        <div className="flex gap-2" style={{ flexDirection: 'column' }}>
          <label htmlFor="icbper">ICBPER:</label>
          <InputText id="icbper" className='' style={forminput} />
        </div>
        <div className="flex gap-2" style={{ flexDirection: 'column' }}>
          <label htmlFor="total">Total:</label>
          <InputText id="total" className='' style={forminput} />
        </div>
      </div>
      <div className="flex gap-2" style={{ flexDirection: 'column' }}>
        <label htmlFor="retencionigv">Retencion IGV:</label>
        <InputText id="retencionigv" className='' style={forminput} />
      </div>
    </Panel>
  )
}

