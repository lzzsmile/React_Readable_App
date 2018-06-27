import {
  BASE_URL_POSTS,
  BASE_URL_COMMENTS,
  Headers } from '../utils/constants'
import { generateId } from '../utils/helper'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_COMMENT = 'LOAD_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const loadComments = (postId) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}/comments`
    fetch(url, {headers: Headers})
      .then(response => response.json())
      .then(comments => {
        dispatch({
          type: LOAD_COMMENTS,
          payload: {
            parentId: postId,
            comments: comments
          }
        })
      })
      .catch(error => console.log(error))
  }
}

export const loadComment = (commentId) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS + `/${commentId}`
    fetch(url, {headers: Headers})
      .then(response => response.json())
      .then(comment => {
        dispatch({type: LOAD_COMMENT, payload: comment})
      })
  }
}

export const addComment = (postId, author, body) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        id: generateId(),
        timestamp: Date.now(),
        body: body,
        author: author,
        parentId: postId,
      })
    })
    .then(response => response.json())
    .then(comment => {
      dispatch({type: ADD_COMMENT, payload: comment})
    })
    .catch(error => console.log(error))
  }
}

export const upvoteComment = (commentId) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS + `/${commentId}`
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        option: 'upVote'
      })
    })
    .then(response => response.json())
    .then(comment => {
      dispatch({type: UPVOTE_COMMENT, payload: comment})
    })
    .catch(error => console.log(error))
  }
}

export const downvoteComment = (commentId) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS + `/${commentId}`
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        option: 'downVote'
      })
    })
    .then(response => response.json())
    .then(comment => {
      dispatch({type: DOWNVOTE_COMMENT, payload: comment})
    })
    .catch(error => console.log(error))
  }
}

export const editComment = (commentId, newBody) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS + `/${commentId}`
    fetch(url, {
      method: 'PUT',
      headers: Headers,
      body: JSON.stringify({
        timestamp: Date.now(),
        body: newBody
      })
    })
    .then(response => response.json())
    .then(comment => {
      dispatch({type: EDIT_COMMENT, payload: comment})
    })
    .catch(error => console.log(error))
  }
}

export const deleteComment = (commentId, parentId) => {
  return (dispatch) => {
    const url = BASE_URL_COMMENTS + `/${commentId}`
    fetch(url, {
      method: 'DELETE',
      headers: Headers,
    })
    .then(() => dispatch({
      type: DELETE_COMMENT,
      payload: {
        parentId: parentId,
        commentId: commentId
      }
    }))
    .catch(error => console.log(error))
  }
}
