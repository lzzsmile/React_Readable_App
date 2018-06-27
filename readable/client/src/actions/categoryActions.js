import { BASE_URL, Headers } from '../utils/constants'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_CATEGORY_POSTS = 'LOAD_CATEGORY_POSTS'

export const loadCategories = () => {
  return (dispatch) => {
    const url = BASE_URL + 'categories'
    fetch(url, {headers: Headers})
      .then(response => response.json())
      .then(categories => {
        dispatch({type: LOAD_CATEGORIES, payload: categories})
      })
      .catch(error => console.log(error))
  }
}

export const loadCategoryPosts = (category) => {
  return (dispatch) => {
    const url = BASE_URL + `${category}/posts`
    fetch(url, {headers: Headers})
      .then(response => response.json())
      .then(posts => {
        console.log(posts)
        dispatch({type: LOAD_CATEGORY_POSTS, payload: posts})
      })
  }
}
