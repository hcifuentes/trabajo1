import { initialState } from "./initialState";
import { SET_DRIVERS_LIST, REMOVE_DRIVER, UPDATE_DRIVER, SELECT_DRIVER } from "./const";
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_DRIVERS_LIST : {
            const obj = {
                ...state,
                drivers: state.drivers.concat(action.payload)
            }
            return obj;
        }
        case REMOVE_DRIVER : {
            return {
                ...state,
                drivers: state.drivers.filter((item, index) => 
                    index !== action.payload
                )
            }
        }
        case SELECT_DRIVER : {
            return {
                ...state,
                driver: action.payload
            }
        }
        case UPDATE_DRIVER : {
            return {
                ...state,
                driver: null,
                drivers: state.drivers.map((item, index) => {
                    if (index === action.payload.idx) {
                        return action.payload;
                    } else {
                        return item;
                    }
                })
            }
        }
        default : {
            return state
        }
    }
}