import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDriverListAction } from './../../store/drivers/actions';
import Driver from './../../models/driver';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';

const FormDriver = props => {

    const [driver, setDriver] = useState(props.driver ? props.driver : new Driver());

    const handlerOnControlChange = ({ target }) => {
        setDriver({
            ...driver,
            [target.name]: target.name === 'active' ? !driver.active : target.value
        });
    }

    const saveForm = () => {
        props.addDriverListAction(driver);
        setDriver(new Driver());
    }

    const clearForm = () => {
        setDriver(new Driver())
    }

    return (
        <FormGroup slot="true">
            {/* RUT */}
            <FormControl>
                <InputLabel htmlFor="rut">RUT</InputLabel>
                <Input
                    id="rut"
                    name="rut"
                    onChange={handlerOnControlChange}
                    value={driver.rut}
                    aria-describedby="RUT del conductor" />
            </FormControl>

            {/* NOMBRE */}
            <FormControl>
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input
                    id="name"
                    name="name"
                    onChange={handlerOnControlChange}
                    value={driver.name}
                    aria-describedby="Nombre del conductor" />
            </FormControl>

            {/* Tipo Licencia */}
            <FormControl>
                <InputLabel htmlFor='Tipo de licencia'></InputLabel>
                <Select
                    id="type"
                    name="licenceType"
                    onChange={handlerOnControlChange}
                    placeholder="Tipo de licencia"
                    value={driver.licenceType}
                    input={<Input placeholder="Tipo de licencia" name="licenceType" id="licenceType" value={driver.licenceType} />}
                >
                    <MenuItem value="" disabled>Tipo de licencia</MenuItem>
                    <MenuItem value={'A1'}>A1</MenuItem>
                    <MenuItem value={'A2'}>A2</MenuItem>
                    <MenuItem value={'A3'}>A3</MenuItem>
                    <MenuItem value={'B'}>B</MenuItem>
                    <MenuItem value={'C'}>C</MenuItem>
                </Select>
                <FormHelperText>Tipo de licencia</FormHelperText>
            </FormControl>

            {/* Edad */}
            <FormControl>
                <InputLabel htmlFor="age">Edad</InputLabel>
                <Input
                    id="age"
                    name="age"
                    onChange={handlerOnControlChange}
                    value={driver.age}
                    aria-describedby="Edad del conductor" />
            </FormControl>

            {/* ACTIVO */}
            <FormControlLabel
                control={
                    <Checkbox
                        name="active"
                        checked={driver.active}
                        onChange={handlerOnControlChange}
                        value={driver.active} />
                }
                label={driver.active ? 'Activo' : 'Inactivo'}
            />

            <FormControl>
                <Button variant="contained" color="primary" 
                    onClick={saveForm}
                >
                    Guardar
                </Button>
                <Button variant="contained" color="secondary"
                    onClick={clearForm}>
                    Limpiar
                </Button>
            </FormControl>
        </FormGroup>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log("stateToProps" , state.drivers.driver)
    return {
        driver: state.drivers.driver
    }
}

const mapDispatchToProps = (dispatch) => ({
    addDriverListAction: payload => dispatch(addDriverListAction(payload))
})



export default connect(mapStateToProps, mapDispatchToProps)(FormDriver);