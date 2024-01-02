import React from 'react'
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

const CajaDiaria = () => {
    let apiroute = 'https://serviciofact.mercelab.com'

    return(
        <div>
            <Button />
            <Panel header="Caja Diaria" className='px-1 pt-2' toggleable >

            </Panel>
        </div>
    )
}

export default CajaDiaria