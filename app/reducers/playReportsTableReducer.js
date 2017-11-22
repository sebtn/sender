import { List, Map, fromJS } from 'immutable'

import { RECEIVE_PLAYS } from '../actions/playTableActions'

export const initialState =Map({
  plays: List()
})

export const setData = (report, state, items) => {
  return Object.assign({}, state, { [report]: items })
}

const receivePlays = (state, plays) =>  {
  var newState = fromJS({
    plays: plays
  })
  return state.merge(newState)
}

export const playReportsTableReducer = (state=initialState, action) => {
  const { items } = action
  switch (action.type) {    
    case RECEIVE_PLAYS:
      return receivePlays(state, action.plays)
  }
  return state
}

export default playReportsTableReducer
