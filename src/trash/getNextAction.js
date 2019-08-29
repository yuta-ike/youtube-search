export const actionCreate = async (args, size) => {
  if(args.favorite == "favorite" || args.history == "history"){
    const content = await searchFavoriteVideo(size)
    console.log(content)
    return {
      type:'FOLDER_READ_NEXT',
      payload:{
        videocardType:"INCLUDE-PATH",
      }
    }
  }else{
    const content = await searchVideoWithCategory(args, size)
    console.log(content)
    return {
      type:'FOLDER_READ_NEXT',
      payload:{
        videocardType:"DEFAULT",
      }
    }
  }
}
