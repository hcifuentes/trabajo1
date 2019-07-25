import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDriverListAction, updateDriverAction } from './../../store/drivers/actions';
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

const FormDriver = props => {
    const AGREGAR = "Agregar nuevo conductor";
    const EDITAR = "Editar conductor";

    const [driver, setDriver] = useState(new Driver());
    const [modalOpened, setModalOpened] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');

    useEffect(() => {
        setDriver(props.driver ? props.driver : new Driver());
        setModalOpened(props.driver ? true : false);
        setDialogTitle(props.driver ? EDITAR : AGREGAR);
    }, [props.driver]);


    const handlerOnControlChange = ({ target }) => {
        setDriver({
            ...driver,
            [target.name]: target.name === 'active' ? !driver.active : target.value
        });
    }

    const saveForm = () => {
        if (!isNaN(driver.idx)) {
            props.updateDriverAction(driver);
        } else {
            props.addDriverListAction(driver);
        }
        closeModal();
        setDriver(new Driver());
    }

    const clearForm = () => {
        setDriver(new Driver())
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    const handkerOnClickOpenModal = () => {
        console.log("cliiiiiick")
        setModalOpened(!modalOpened);
    }

    return (
        <div>
            <div>
                <Button onClick={handkerOnClickOpenModal}>{dialogTitle}</Button>
            </div>

            <Dialog open={modalOpened} onClose={clearForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
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
                                type="number"
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
                        </FormGroup>
                        </DialogContent>
                            <DialogActions>
                                <Button onClick={handkerOnClickOpenModal} color="terciary">
                                    Cancelar
                                </Button>
                                <Button onClick={clearForm} color="info">
                                    Limpiar
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