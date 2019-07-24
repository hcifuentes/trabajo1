import { initialState } from "./initialState";
import { SET_DRIVERS_LIST, REMOVE_DRIVER } from "./const";
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_DRIVERS_LIST : {
            return {
                ...state,
                drivers: state.drivers.concat(action.payload)
            }
        }
        case REMOVE_DRIVER : {
            return {
                ...state,
                drivers: state.drivers.filter((item, index) => 
                    index !== action.payload
                )
            }
        }
        default : {
            return state
        }
    }
}