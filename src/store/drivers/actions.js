import { SET_DRIVERS_LIST, REMOVE_DRIVER } from './const.js';

export const addDriverListAction = driver => (
    dispatch => dispatch({type: SET_DRIVERS_LIST, payload: driver})
)

export const removeDriverFromListAction = idx => (
    dispatch => dispatch({type: REMOVE_DRIVER, payload: idx})
)