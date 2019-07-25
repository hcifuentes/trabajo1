import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isNumeric, notEmpty, optionSelected, validateRut, validateForm, numberInRange } from './../../utils/formValidations';
import { addDriverListAction, updateDriverAction } from './../../store/drivers/actions';
import Driver, { DriverForm } from './../../models/driver';

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormGroup,
    FormHelperText,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Select
     } from '@material-ui/core';

const FormDriver = props => {

    const AGREGAR = "Agregar nuevo conductor";
    const EDITAR = "Editar conductor";
    const MIN_AGE = 18;
    const MAX_AGE = 75;
    const ERROR = 'Invalido';
    const OK = 'OK';
    const licencesTypes = ["","A1", "A2", "A3", "A4", "A5", "B", "C", "D", "E", "F"];

    const [driver, setDriver] = useState(new Driver());
    const [modalOpened, setModalOpened] = useState(false);
    const [formValidation, setFormValidation] = useState(new DriverForm(false));
    const [dialogTitle, setDialogTitle] = useState('');

    useEffect(() => {
        setDriver(props.driver ? props.driver : new Driver());
        setModalOpened(props.driver ? true : false);
        setDialogTitle(props.driver ? EDITAR : AGREGAR);
        setFormValidation(props.driver ? new DriverForm(true) : new DriverForm(false));
    }, [props.driver]);

    const handlerOnControlChange = ({ target }) => {
        let value;
        switch(target.name) {
            case 'active': {
                value = !driver.active;
                break;
            }
            case 'rut': {
                const validate = validateRut(target.value);
                updateFormValidation(target, validate.validation);
                value = validate.validation ? validate.formattedRut : target.value;
                break;
            }
            case 'name' :{
                updateFormValidation(target, notEmpty(target.value));
                value = target.value;
                break;
            }
            case 'licenceType': {
                updateFormValidation(target, optionSelected(target.value));
                value = target.value;
                break;
            }
            case 'age' : {
                updateFormValidation(target, isNumeric(target.value) && numberInRange(target.value, MIN_AGE, MAX_AGE));
                value = target.value;
                break;
            }
            default: {
                value = target.value;
                break;
            }
        }

        setDriver({
            ...driver,
            [target.name]: value
        });

    }

    const updateFormValidation = (target, state) => setFormValidation({ ...formValidation, [target.name]: state });
    

    const saveForm = () => {
        if (validateForm(formValidation)) {
            if (!isNaN(driver.idx)) {
                props.updateDriverAction(driver);
            } else {
                props.addDriverListAction(driver);
            }
            closeModal();
            setDriver(new Driver());
            setFormValidation(new DriverForm())
        }
    }

    const closeModal = () => setModalOpened(false);
    const handkerOnClickOpenModal = () => {
        setModalOpened(!modalOpened);
        setDriver(new Driver());
        setFormValidation(new DriverForm());
    }

    return (
        <div>
            <div>
                <Button variant="outlined" color="primary" onClick={handkerOnClickOpenModal}>Agregar nuevo conductor</Button>
            </div>

            <Dialog open={modalOpened} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <FormGroup slot="true">
                        {/* RUT */}
                        <FormControl>
                            <InputLabel htmlFor="rut">RUT</InputLabel>
                            <Input
                                name="rut"
                                required
                                onChange={handlerOnControlChange}
                                value={driver.rut}
                                aria-describedby="RUT del conductor"
                            />
                            {/* <FormHelperText id="{ formValidation.rut ? 'component-error-text' : ''"> */}
                            {formValidation.rut ? OK : ERROR}
                            {/* </FormHelperText> */}
                        </FormControl>

                        {/* NOMBRE */}
                        <FormControl>
                            <InputLabel htmlFor="name">Nombre</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                required
                                onChange={handlerOnControlChange}
                                value={driver.name}
                                aria-describedby="Nombre del conductor" />
                            <span>{formValidation.name ? 'Valido' : 'invalido'}</span>
                        </FormControl>

                        {/* Tipo Licencia */}
                        <FormControl>
                            <InputLabel htmlFor='Tipo de licencia'></InputLabel>
                            <Select
                                id="type"
                                name="licenceType"
                                required
                                onChange={handlerOnControlChange}
                                placeholder="Tipo de licencia"
                                value={driver.licenceType}
                                input={<Input placeholder="Tipo de licencia" name="licenceType" id="licenceType" value={driver.licenceType} />}
                            >
                                {
                                    licencesTypes.map((item, idx) => <MenuItem key={idx} value={item}>{item}</MenuItem>)
                                }
                            </Select>
                            <FormHelperText>Tipo de licencia</FormHelperText>
                            <span>{formValidation.licenceType ? 'Valido' : 'invalido'}</span>
                        </FormControl>

                        {/* Edad */}
                        <FormControl>
                            <InputLabel htmlFor="age">Edad (min={MIN_AGE} , max={MAX_AGE})</InputLabel>
                            <Input
                                type="number"
                                id="age"
                                name="age"
                                required
                                onChange={handlerOnControlChange}
                                value={driver.age}
                                aria-describedby="Edad del conductor" />
                            <span>{formValidation.age ? 'Valido' : 'invalido'}</span>
                        </FormControl>

                        {/* ACTIVO */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="active"
                                    required
                                    checked={driver.active}
                                    onChange={handlerOnControlChange}
                                    value={driver.active} />
                            }
                            label={driver.active ? 'Activo' : 'Inactivo'}
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handkerOnClickOpenModal} color="secondary">
                        Cancelar
                                </Button>
                    <Button onClick={saveForm} color="primary">
                        Guardar
                                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        driver: state.drivers.driver
    }
}

const mapDispatchToProps = (dispatch) => ({
    addDriverListAction: payload => dispatch(addDriverListAction(payload)),
    updateDriverAction: payload => dispatch(updateDriverAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormDriver);