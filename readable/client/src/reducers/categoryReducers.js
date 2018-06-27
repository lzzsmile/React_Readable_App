import {
  LOAD_CATEGORIES,
} from '../actions/categoryActions'

const INITIAL_STATE = {
  categories: []
}

export default function categories(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}
