import {
  LOAD_POSTS,
  LOAD_POST,
  ADD_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/postActions'
import {
  LOAD_CATEGORY_POSTS
} from '../actions/categoryActions'

const INITIAL_STATE = {
  posts: [],
  post: {},
}

export default function posts(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case LOAD_POST:
      return {
        ...state,
        post: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.payload
        ],
        post: action.payload
      }
    case UPVOTE_POST:
    case DOWNVOTE_POST:
    case EDIT_POST:
      const newpost = action.payload
      return {
        ...state,
        posts: state.posts.map(post => post.id === newpost.id ? newpost : post),
        post: newpost
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }
    case LOAD_CATEGORY_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return state
  }
}
