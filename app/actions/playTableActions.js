import { getPlays } from '../api'

export const START_PLAYS_FETCH = "START_PLAYS_FETCH"
export const startPlaysFetch = () => dispatch  =>  {
  dispatch( playsFetch() )
  return getPlays
    .then( res => res.json() )
    .then( json => dispatch(receivePlays(json) ))
    .catch( err => console.log(err) )
}

export const RECEIVE_PLAYS = "RECEIVE_PLAYS"
export const receivePlays = json => {
  return {
    type: RECEIVE_PLAYS,
    plays: json.plays
  }
}

export const PLAYS_FETCH = "PLAYS_FETCH"
export const playsFetch = ()  =>  {
  return {
    type: PLAYS_FETCH
  }
}

export const FETCH_LOCATION = "FETCH_LOCATION"
export const FetchLocation = getState => id => {
  return {
    type: FETCH_LOCATION,
    payload: id
  }
}

export const GET_PLAY_NEXT_DATA = "GET_PLAY_NEXT_DATA"
export const getPlayNextData = json => type => {
  return {
    type: GET_PLAY_NEXT_DATA,
    payload: {
        playNextData: json.type
      }
    }
}

