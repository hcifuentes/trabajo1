import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeDriverFromListAction, selectDriverAction } from './../../store/drivers/actions';

import DriverTR from './DriverTR';
import {
    FormControl,
    Input,
    InputLabel,
    Table,
    Paper,
    TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';


const ListDrivers = (props) => {

    const { adminDrivers: { drivers } } = props;

    const [filterText, setFilterText] = useState('');

    const handlerFilterChange = ({ target: { value } }) => setFilterText(value);

    /** Metodo de filtro de conductores por sus campos*/
    const isFiltered = (d) => {
        return (
            containsText(d.rut) ||
            containsText(d.name) ||
            containsText(d.licenceType) ||
            containsText(d.age)
        )
    }

    const onCLickRemoveDriver = idx => props.removeDriverFromListAction(idx);

    const onCLickUpdateDriver = idx => props.selectDriverAction({ ...drivers[idx], idx });

    const containsText = (text) =>
        text && text.toString().toUpperCase().search(filterText.toUpperCase()) > -1;

    return (
        <Paper>
            <h2>Listado de conductores</h2>
            <Paper>
                <FormControl row="false" fullWidth={true}> 
                    <InputLabel htmlFor="rut" xs="12">Ingrese texto para filtrar conductores</InputLabel>
                    <Input
                        xs="12"
                        name="filter"
                        onChange={handlerFilterChange}
                        value={filterText}
                        aria-describedby="Ingrese texto para filtrar conductores" />
                </FormControl>
            </Paper>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rut</TableCell>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="center">Tipo licencia</TableCell>
                            <TableCell align="center">Edad</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            drivers && drivers.map(
                                (driver, index) => {
                                    if (isFiltered(driver)) {
                                        return <DriverTR
                                            onCLickRemoveDriver={onCLickRemoveDriver}
                                            onCLickUpdateDriver={onCLickUpdateDriver}
                                            key={index}
                                            driver={driver}
                                            index={index} />
                                    } else {
                                        return false;
                                    }
                                })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Paper>
    )
}

// export default ListDrivers;

const mapStateToProps = ({ drivers }, ownProps) => {
    return {
        adminDrivers: drivers
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeDriverFromListAction: payload => dispatch(removeDriverFromListAction(payload)),
    selectDriverAction: payload => dispatch(selectDriverAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDrivers);