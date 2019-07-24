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
    
    const { drivers: {drivers} } = props;
    const [filter, setFIlter] = useState('');

    const INACTIVO = 'Inactivo';
    const ACTIVO = 'Activo';

    const handlerFilterChange = ({ target: {value} }) => setFIlter(value);
    
    /** Metodo de filtro de conductores por sus campos*/
    const isFiltered = (d) => {
        if(
            containsText(d.rut) || 
            containsText(d.name) || 
            containsText(d.licenceType) || 
            containsText(d.age) ||
            ( d.active && containsText(ACTIVO)) || 
            ( !d.active && containsText(INACTIVO)) ){
                return true;
            } else {
                return false;
            }
    }

    const onCLickRemoveDriver = idx => {
        console.log("eliminando");
        props.removeDriverFromListAction(idx);
    }

    const onCLickUpdateDriver = idx => {
        console.log("Mandando a actualizar", idx);
        props.selectDriverAction({...drivers[idx], idx});
    }

    const containsText = (text) => 
        text && text.toString().toUpperCase().search(filter.toUpperCase()) > -1; 
    return (
        <div>
            <Paper>
            <FormControl row="true">
                <InputLabel htmlFor="rut">Ingrese texto para filtrar conductores</InputLabel>
                <Input
                    name="filter"
                    onChange={handlerFilterChange}
                    value={filter}
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
                            <TableCell align="center">Eliminar</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            drivers && drivers.map(
                                (driver, index) => {
                                    if(isFiltered(driver)){
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
        </div>
    )
}

// export default ListDrivers;

const mapStateToProps = (reducer, ownProps) => {
    return {
        drivers: reducer.drivers
    }
} 

const mapDispatchToProps = (dispatch) => ({
    removeDriverFromListAction: payload => dispatch(removeDriverFromListAction(payload)),
    selectDriverAction: payload => dispatch(selectDriverAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDrivers);