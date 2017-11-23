export const PLAYREPORTS_INIT = 'tempo/playreports/init'
export const PLAYREPORTS_DATA_FAVORITES = 'tempo/playreports/data/favorites'
export const PLAYREPORTS_DATA_MULTICREDITS = 'tempo/playreports/data/multicredits'
export const PLAYREPORTS_DATA_PLAYNEXT = 'tempo/playreports/data/playnext'
export const PLAYREPORTS_DATA_JUKEBOX = 'tempo/playreports/data/jukebox'
export const PLAYREPORTS_DATA_MOBILE = 'tempo/playreports/data/mobile'
export const PLAYREPORTS_DATA_BACKGROUND = 'tempo/playreports/data/background'
export const PLAYREPORTS_TAB = 'tempo/playreports/tab'
export const PLAYREPORTS_RANGE = 'tempo/playreports/range'
export const PLAYREPORTS_VISIBILITY = 'tempo/playreports/visibility'
export const PLAYREPORTS_VISIBILITY_BAR_LABELS = 'tempo/playreports/visibility/labels'
export const PLAYREPORTS_SORT = 'tempo/playreports/sort'
export const PLAYREPORTS_SORT_RESET = 'tempo/playreports/sort/reset'

export const initialState = {
  favorites: [1254, 568, 2457, 3598, 5672, 1255, 5623, 7785, 1245, 3546, 2457, 8726, 4532, 457, 2547, 6532, 7856, 3254, 5488],
  multiCredits: [2658, 2050, 5068, 11058, 12057, 4058, 18024, 15987, 2056, 10587, 9035, 30547, 11599, 1405, 8036, 21035, 8074, 9021, 18068],
  normal: [28, 56, 45, 23, 62, 36, 41, 12, 35, 32, 29, 31, 35, 12, 28, 50, 21, 26],
  playNext: [17, 14, 13, 12, 9, 8, 6, 6, 5, 5, 4, 3, 2, 1, 0, 0, 0, 0],
  jukebox: [28, 12, 23, 45, 56, 41, 36, 32, 12, 31, 62, 35, 29, 35, 28, 50, 21, 26],
  mobile: [17, 6, 12, 13, 14, 6, 8, 5, 1, 3, 9, 5, 4, 2, 0, 0, 0, 0],
  background: [0, 0, 32, 15, 18, 0, 48, 27, 0, 12, 78, 69, 64, 22, 0, 0, 25, 0],

  activeTab: 0,
  range: 'last-week', // last-week last-month last-month-3 last-month-6 last-year custom
  customRange: { start: null, end: null },

  visibility: {
    favorite: true,
    multiCredit: true,
    normal: true,
    playNext: true,
    jukebox: true,
    mobile: true,
    background: true,

    barLabels: true,
  },
  sort: {
    id: null,
    order: null
  }
}

export const init = (state, action) => {
  const {
    favorites,
    multiCredits,
    normal,
    playNext,
    jukebox,
    mobile,
    background
  } = action

  return Object.assign({}, state, {
    favorites,
    multiCredits,
    normal,
    playNext,
    jukebox,
    mobile,
    background
  })
}

export const setData = (report, state, items) => {
  return Object.assign({}, state, { [report]: items })
}

export const setTab = (state, action) => {
  return Object.assign({}, state, { activeTab: action.index })
}

export const setRange = (state, action) => {
  const { range, start, end } = action
  const customRange = 'custom' !== range ? state.customRange : { start, end }
  return Object.assign({}, state, { range, customRange })
}

export const toggleVisibility = (state, id) => {
  const visibility = Object.assign({}, state.visibility, { [id]: !state.visibility[id] })
  return Object.assign({}, state, { visibility })
}

export const sortBy = (state, {id, order}) => {
  return Object.assign({}, state, { sort: { id, order } })
}

export const playReports = (state=initialState, action) => {
  const { items } = action

  switch (action.type) {
    case PLAYREPORTS_INIT:
      return init(state, action)

    case PLAYREPORTS_DATA_FAVORITES:
      return setData('favorites', state, items)
    case PLAYREPORTS_DATA_MULTICREDITS:
      return setData('multiCredits', state, items)
    case PLAYREPORTS_DATA_PLAYNEXT:
      return setData('playNext', state, items)
    case PLAYREPORTS_DATA_JUKEBOX:
      return setData('jukebox', items)
    case PLAYREPORTS_DATA_MOBILE:
      return setData('mobile', items)
    case PLAYREPORTS_DATA_BACKGROUND:
      return setData('background', items)

    case PLAYREPORTS_TAB:
      return setTab(state, action)

    case PLAYREPORTS_RANGE:
      return setRange(state, action)

    case PLAYREPORTS_VISIBILITY:
       return toggleVisibility(state, action.id)

    case PLAYREPORTS_VISIBILITY_BAR_LABELS:
      return toggleVisibility(state, 'barLabels')

    case PLAYREPORTS_SORT:
      return sortBy(state, action)
    case PLAYREPORTS_SORT_RESET:
      return sortBy(state, { id: null, order: null })
  }

  return state
}

export default playReports
