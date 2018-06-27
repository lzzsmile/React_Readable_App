import { combineReducers } from 'redux'
import posts from './postReducers'
import comments from './commentReducers'
import categories from './categoryReducers'
import preferences from './preferenceReducers'


export default combineReducers({
  posts,
  comments,
  categories,
  preferences,
});
