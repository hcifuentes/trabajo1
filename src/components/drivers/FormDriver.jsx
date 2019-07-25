import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDriverListAction, updateDriverAction } from './../../store/drivers/actions';
import Driver from './../../models/driver';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: 'none',
    },
  }));


const FormDriver = props => {

    const classes = useStyles();

    const [driver, setDriver] = useState(new Driver());
    const [modalOpened, setModalOpened] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    useEffect(()=> {
        setDriver(props.driver ? props.driver : new Driver());
    },[props.driver]);


    const handlerOnControlChange = ({ target }) => {
        setDriver({
            ...driver,
            [target.name]: target.name === 'active' ? !driver.active : target.value
        });
        closeModal();
    }

    const saveForm = () => {
        if(!isNaN(driver.idx)){
            props.updateDriverAction(driver);
        } else {
            props.addDriverListAction(driver);
        }
        
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
                <Button onClick={handkerOnClickOpenModal}>Agregar Conductor</Button>
            </div>
        
            <Modal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalOpened}>
            <FormGroup slot="true" style={modalStyle} className={classes.paper}>
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
                <Button variant="contained" color="info"
                    onClick={handkerOnClickOpenModal}>
                    Cerrar
                </Button>
            </FormControl>
        </FormGroup>
        </Modal>
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