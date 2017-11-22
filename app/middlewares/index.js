import { applyMiddleware, compose } from 'redux'
import { dispatchLogger } from './dispatch-logger'
import thunk from 'redux-thunk'

export const middlewares = [
  thunk,
  dispatchLogger,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Middlewares = composeEnhancers(applyMiddleware(...middlewares))

export default Middlewares
