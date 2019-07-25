import { SET_DRIVERS_LIST, REMOVE_DRIVER, UPDATE_DRIVER, SELECT_DRIVER } from './const.js';

export const addDriverListAction = driver => (
    dispatch => dispatch({type: SET_DRIVERS_LIST, payload: driver})
)

export const removeDriverFromListAction = idx => (
    dispatch => dispatch({type: REMOVE_DRIVER, payload: idx})
)

export const updateDriverAction = (driver) => (
    dispatch => dispatch({type: UPDATE_DRIVER, payload: driver})
)

export const selectDriverAction = (driver) => {
    return dispatch => dispatch({type: SELECT_DRIVER, payload: driver})
}