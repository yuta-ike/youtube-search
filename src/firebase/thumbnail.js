import axios from 'axios'
import { upload as uploadStorage, get as getStorage} from "./core/storage.js"

export const upload = async (id, url) => {
  try{
    const response = await fetch(`${process.env.REACT_APP_GAS_URL}?target=${encodeURIComponent(url)}`)
    const base64 = await response.text()
    uploadStorage("thumbnails", id, base64)
  }catch(e){
    console.log(id)
    console.log(e)
  }
}

const cache = {}
export const get = async (id)=>{
  if(id in cache){
    return cache[id]
  }
  const result = await getStorage("thumbnails", id)
  cache[id] = result
  return result
}

// `https%3A%2F%2Fi9.ytimg.com%2Fvi%2FtAJKzdCAyjs%2Fmqdefault.jpg%3Fsqp%3DCPCpiu4F%26rs%3DAOn4CLBSXqbj0VE3UhUc6AHn3uFlLW1Iig`
// .split("\n").forEach(url => {
//   upload(url.match(/https%3A%2F%2Fi9\.ytimg\.com%2Fvi%2F(.{11})/)[1], decodeURIComponent(url))
// })
// upload("4DxKPnwP14", "https://i9.ytimg.com/vi/er0uovtxYmE/mqdefault.jpg?sqp=CODCie4F&rs=AOn4CLBX0nTbb8cjdeeV2qAxxM4UK9y-OQ")
