const redux = require('redux')
const axios = require('axios')
const thunkMiddlerware = require('redux-thunk').default

const initialState = {
    loading: false,
    user: [],
    error: '',
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILUER = 'FETCH_USER_FAILUER'

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    }
}

const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user,
    }
}

const fetchUserFailuer = (error) => {
    return {
        type: FETCH_USER_FAILUER,
        payload: error,
    }
}

// async action creater 
// provided by thunk 
// lets you return function having dispatch as props instead of object
const fetchUser = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const user = res.data.map(user => user.id)
                dispatch(fetchUserSuccess(user))
            })
            .catch((err) => {
                const error = err.message
                dispatch(fetchUserFailuer(error))
            })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: '',
            }
        case FETCH_USER_FAILUER:
            return {
                loading: false,
                user: [],
                error: action.payload,
            }
        default:
            return state
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddlerware))

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUser())

// unsubscribe()