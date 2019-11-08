export const pageData = (conditions, folderType) => {
  if(folderType === 'SUB_FOLDER'){
    return {
      type: 'FILE_READ',
      payload:{
        searchType: "INDIVIDUAL-DATA",
        videocardType:"INCLUDE-PATH",
        conditions,
      }
    }
  }else if(folderType === 'MAIN_FOLDER'){
    return {
      type:'FILE_READ',
      payload:{
        searchType: "GENERAL-DATA",
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

export const pageDataSearch = query => ({
  type: 'FILE_SEARCH',
  payload: {query},
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
