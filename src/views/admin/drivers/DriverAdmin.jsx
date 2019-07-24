import React from 'react';
import Card from '@material-ui/core/Card';
import FormDriver from './../../../components/drivers/FormDriver';
import ListDrivers from './../../../components/drivers/ListDrivers';
import { Provider } from 'react-redux';
import store from './../../../store/store';

const DriverAdmin = () => {
    return (
        <Provider store={store}>
            <Card>
                <FormDriver />
                <ListDrivers />
            </Card>
        </Provider>
    )
}

export default DriverAdmin;