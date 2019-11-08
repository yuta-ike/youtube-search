import { storage } from './index.js'
const thumbnailFolder =  storage.ref('thumbnails')

const errorIds = []
export const upload = async (path, id, data) => {
  if(path === 'thumbnails'){
    const spaceRef = thumbnailFolder.child(`${id}.jpg`);
    await spaceRef.putString(data, "base64", {contentType: 'image/jpeg'}).then(() => console.log("success to upload images"))
  }else{
    console.error("Unknown firebase storage folder.")
  }
}

export const get = async (path, id) => {
  if(path === 'thumbnails'){
    try{
      return await thumbnailFolder.child(`${id}.jpg`).getDownloadURL()
    }catch{
      return null
    }
  }else{
    console.error("Unknown firebase storage folder.")
  }
}