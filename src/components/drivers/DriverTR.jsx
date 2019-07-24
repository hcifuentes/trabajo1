import React from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';

const DriverTR = props => {
    const {driver, index, onCLickRemoveDriver} = props;
    return (
        <TableRow key={index}>
            <TableCell>{driver.rut}</TableCell>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.licenceType}</TableCell>
            <TableCell>{driver.age}</TableCell>
            <TableCell>{driver.active ? 'Activo' : 'Inactivo'}</TableCell>
            <TableCell><Button onClick={() => onCLickRemoveDriver(index)}>X</Button></TableCell>
        </TableRow>
    )
}

export default DriverTR;