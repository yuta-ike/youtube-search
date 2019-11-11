export const pageData = (conditions, folderType, size=24) => {
  if(folderType === 'SUB_FOLDER'){
    return {
      type: 'FILE_READ',
      payload:{
        searchType: "PERSONIZED-SEARCH",
        videocardType:"INCLUDE-PATH",
        conditions,
      }
    }
  }else if(folderType === 'MAIN_FOLDER'){
    return {
      type:'FILE_READ',
      payload:{
        searchType: "CATEGORY-SEARCH",
        videocardType:"DEFAULT",
        conditions,
      }
    }
  }
}

export const pageDataNext = () => ({
  type: 'FILE_READ_NEXT',
  payload: {},
})

export const pageDataBack = () => ({
  type: 'FILE_READ_BACK',
  payload: {},
})

export const pageDataRefresh = () => ({
  type: 'FILE_READ_REFRESH',
  payload: {},
})

export const pageDataSearch = query => ({
  type: 'FILE_SEARCH',
  payload: {
    query,
    searchType: "QUERY-SEARCH",
    videocardType:"INCLUDE-PATH",
  },
})

export const primData = value => {
  return {
    type: 'PRIM_DATA',
    payload:{
      content: value
    }
  }
}

export const breadcrumbs = value => {
  return {
    type: 'BREADCRUMBS',
    payload:{
      content:value
    }
  }
}

export const mainContent = value => {
  return {
    type: 'MAIN_CONTENT',
    payload:{
      content: value
    }
  }
}
