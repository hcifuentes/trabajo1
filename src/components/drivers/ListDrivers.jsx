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
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';


const ListDrivers = (props) => {

    const { adminDrivers: { drivers } } = props;

    const [filterText, setFilterText] = useState('');
    const [filterState, setFilterState] = useState('0');

    const handlerFilterChange = ({ target: { value } }) => setFilterText(value);

    const handleFilterStateChange = ({ target: { value } }) => setFilterState(value);

    /** Metodo de filtro de conductores por sus campos*/
    const isFiltered = (d) => {
        return (
            (containsText(d.rut) ||
            containsText(d.name) ||
            containsText(d.licenceType) ||
            containsText(d.age))
            &&
            (filterState === '0' || (filterState === '1' && d.active) || (filterState === '2' && !d.active))
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
                <FormControl row="true"> 
                <FormLabel component="legend">Estado del conductor</FormLabel>
                <RadioGroup
                    aria-label="Estado"
                    name="stateFilter"
                    value={filterState}
                    onChange={handleFilterStateChange}
                >
                    <FormControlLabel value="0" control={<Radio />} label="Todos" />
                    <FormControlLabel value="1" control={<Radio />} label="Activos" />
                    <FormControlLabel value="2" control={<Radio />} label="Inactivos" />
                </RadioGroup>
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