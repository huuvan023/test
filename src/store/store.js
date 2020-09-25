import React, {createContext, useReducer} from 'react';
import * as consts from './constants';

const initialState = {
    loading: false,
    localLoading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    screams: [],
    notifications: [],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    

    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case consts.SET_LOADING :
                state.loading = true
                return {
                    ...state
                }
                break;
            case consts.SET_DONELOADING :
                state.loading = false
                return {
                    ...state
                }
            break;
            case consts.SET_LOCALLOADING :
                state.localLoading = true
                return {
                    ...state
                }
            break;
            case consts.SET_DONELOCALLOADING :
                state.localLoading = false
                return {
                    ...state
                }
            break;
            case consts.FETCH_USER:
                state.credentials = action.payload.cedentials
                state.authenticated = true
                return state
            break;
            case consts.FETCH_SCREAMS:
                state.screams = action.payload
                return state
                break;
            case consts.SET_AUTHENTICATED:
                return {
                    ...state,
                    authenticated: true
                }
                break;
            case consts.SET_UNAUTHENTICATED:
                return initialState;
                break;
            case consts.SET_USER: 
                return {
                    authenticated: true,
                    ...action.payload
                }
                break;
            case consts.LOG_OUT:
                localStorage.removeItem('FBIDToken')
                return initialState;
                break;
            default:
                throw new Error("No action executed!")
        };
    }, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };