export const SET_SORTING_PREFERENCE_BY_DATE = 'SET_SORTING_PREFERENCE_BY_DATE'
export const SET_SORTING_PREFERENCE_BY_SCORE = 'SET_SORTING_PREFERENCE_BY_SCORE'

export const setSortingPreferenceByDate = () => {
  return (dispatch) => {
    dispatch({type: SET_SORTING_PREFERENCE_BY_DATE})
  }
}

export const setSortingPreferenceByScore = () => {
  return (dispatch) => {
    dispatch({type: SET_SORTING_PREFERENCE_BY_SCORE})
  }
}
