export const pageData = (hierarchy, limit) => {
  if(hierarchy.category == "favorite" || hierarchy.category == "history"){
    return {
      type: 'FILE_READ',
      payload:{
        searchType: "INDIVIDUAL_DATA",
        videocardType:"INCLUDE-PATH",
        hierarchy,
        limit,
      }
    }
  }else{
    return {
      type:'FILE_READ',
      payload:{
        searchType: "GENERAL_DATA",
        videocardType:"DEFAULT",
        hierarchy,
        limit,
      }
    }
  }
}

export const morePageData = async (limit) => {
  console.log(limit)
  return {
    type: 'FILE_READ_MORE',
    payload:{
      limit,
    }
  }
}

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
