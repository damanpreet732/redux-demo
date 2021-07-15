// importing redux to app
const redux = require('redux')
const reduxLogger = require('redux-logger')

// action name is just a string 
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// whole function is called action creater 
function buyCake() {
    // Action is object which has type prop init 
    return {
        type: BUY_CAKE,
        info: 'First Action Created',
    }
}

function buyIceCream() {
    // Action is object which has type prop init 
    return {
        type: BUY_ICECREAM,
        info: 'Second Action Created',
    }
}

// store should be only one single object

// const initailState = {
//     numOfCakes: 10,
//     numOfIceCream: 20,
// } 


/** 
 *  NOTE : it is totally up to you to make diffrent reducers or use one 
 *  but recomended to break users for debugging purpose 
 *  consider it as a shop keeper tacking care of only one shop 
 *  so if any thing goes off you know which one is accountable 
 */

const initailCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCream: 20,
}

// Reducer (prev , action) => newState
const cakeReducer = (state = initailCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1,
            }
        default:
            return state
    }
}

// combine multiple reducers into one but chnages the way to access store state.cake.numOfCakes instead of state.numOfCakes
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

// instance of store 
const store = redux.createStore(rootReducer, redux.applyMiddleware(reduxLogger.createLogger()))

console.log('Initial State', store.getState(), '\n')

// subsrcipe to store changes
const unsubscribe = store.subscribe(() => { 
    // console.log('Updated State', store.getState()) 
})

// calling an action 
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyIceCream())

// just to reduce memory leaks 
unsubscribe()