import {
  LOAD_COMMENTS,
  LOAD_COMMENT,
  ADD_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/commentActions'

const INITIAL_STATE = {
  comments: [],
  comment: {}
}

export default function comments(state=INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments
      }
    case LOAD_COMMENT:
      return {
        ...state,
        comment: action.payload
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload
        ],
        comment: action.payload
      }
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
    case EDIT_COMMENT:
      const newcomment = action.payload
      return {
        ...state,
        comments: state.comments.map(comment => comment.id === newcomment.id ? newcomment : comment),
        comment: newcomment
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.commentId)
      }
    default:
      return state
  }
}
