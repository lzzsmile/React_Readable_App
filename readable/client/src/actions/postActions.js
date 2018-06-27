import { BASE_URL_POSTS, Headers } from '../utils/constants'
import { generateId } from '../utils/helper'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST = 'LOAD_POST'
export const ADD_POST = 'ADD_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const loadPosts = () => {
  return (dispatch) => {
    const url = BASE_URL_POSTS
    fetch(url, { headers: Headers })
      .then(response => response.json())
      .then(posts => {
        dispatch({type: LOAD_POSTS, payload: posts})
      })
      .catch(error => console.log(error))
  }
}

export const loadPost = (postId) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}`
    fetch(url, {headers: Headers})
      .then(response => response.json())
      .then(post => {
        dispatch({type: LOAD_POST, payload: post})
      })
  }
}

export const addPost = (author, category, title, body) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        id: generateId(),
        timestamp: Date.now(),
        title: title,
        body: body,
        author: author,
        category: category,
      })
    })
    .then(response => response.json())
    .then(post => {
      dispatch({type: ADD_POST, payload: post})
    })
    .catch(error => console.log(error))
  }
}

export const upvotePost = (postId) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}`
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        option: 'upVote'
      })
    })
    .then(response => response.json())
    .then(post => {
      dispatch({type: UPVOTE_POST, payload: post})
    })
    .catch(error => console.log(error))
  }
}

export const downvotePost = (postId) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}`
    fetch(url, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        option: 'downVote'
      })
    })
    .then(response => response.json())
    .then(post => {
      dispatch({type: DOWNVOTE_POST, payload: post})
    })
    .catch(error => console.log(error))
  }
}

export const editPost = (postId, newTitle, newBody) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}`
    fetch(url, {
      method: 'PUT',
      headers: Headers,
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
      })
    })
    .then(response => response.json())
    .then(post => {
      dispatch({type: EDIT_POST, payload: post})
    })
    .catch(error => console.log(error))
  }
}

export const deletePost = (postId) => {
  return (dispatch) => {
    const url = BASE_URL_POSTS + `/${postId}`
    fetch(url, {
      method: 'DELETE',
      headers: Headers,
    })
    .then(() => dispatch({type: DELETE_POST, payload: postId}))
    .catch(error => console.log(error))
  }
}
