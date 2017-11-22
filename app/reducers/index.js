import { combineReducers } from 'redux'
import playReportsTableReducer from './playReportsTableReducer'

const rootReducer = combineReducers({
  plays: playReportsTableReducer,
})

export default rootReducer
