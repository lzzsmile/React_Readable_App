import {
  SET_SORTING_PREFERENCE_BY_DATE,
  SET_SORTING_PREFERENCE_BY_SCORE
} from '../actions/preferenceActions'

const INITIAL_STATE = {
  preference: ""
}

export default function preferences(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SORTING_PREFERENCE_BY_DATE:
      return {
        ...state,
        preference: "byDate"
      }
    case SET_SORTING_PREFERENCE_BY_SCORE:
      return {
        ...state,
        preference: "byScore"
      }
    default:
      return state
  }
}
