export const addFavorite = vid => {
  return {
    type:'ADD_FAVORITE',
    payload:{
      content: vid
    }
  }
}

export const removeFavorite = vid => {
  return {
    type:'REMOVE_FAVORITE',
    payload:{
      content:vid
    }
  }
}
