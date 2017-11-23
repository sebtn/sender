import { combineReducers } from 'redux'
import playReportsTableReducer from './playReportsTableReducer'
import playReportsTableReducerBad from './playReportsTableReducerBad'


const rootReducer = combineReducers({
  // state: state = () => state 
  plays: playReportsTableReducerBad,
  playReportsTableReducer
})

export default rootReducer
