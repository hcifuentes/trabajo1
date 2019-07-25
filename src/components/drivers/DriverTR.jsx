import React from 'react';
import { TableRow, TableCell, Button, Grid, Icon } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const DriverTR = props => {
    const {driver, index, onCLickRemoveDriver, onCLickUpdateDriver} = props;
    return (
        <TableRow key={index}>
            <TableCell align="left">{driver.rut}</TableCell>
            <TableCell align="left">{driver.name}</TableCell>
            <TableCell align="center">{driver.licenceType}</TableCell>
            <TableCell align="center">{driver.age}</TableCell>
            <TableCell align="center">{driver.active ? 'Activo' : 'Inactivo'}</TableCell>
            <TableCell align="center">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={1} direction="column" alignItems="center">
                            <Grid item>
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button onClick={() => onCLickRemoveDriver(index)}><Icon color="secondary">delete_icon</Icon></Button>
                                    <Button onClick={() => onCLickUpdateDriver(index)}><Icon color="primary">edit_icon</Icon></Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    )
}

export default DriverTR;