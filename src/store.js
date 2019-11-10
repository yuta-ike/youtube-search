import { getVideo } from './firebase/videoManager.js'
import { localStorageTable } from './localStorageManager.js'

let events = {}

let prevStates = {
  PAGE_UPDATE:{
    payload:{content:[]}
  },
  INCLUDE_PATH:{
    payload:{}
  },
}

const currState = {}

export const store = async (name, _currState) => {
  switch(_currState.type){
    case 'FILE_READ': {
      const currPayload = _currState.payload
      const size = localStorageTable["NUM-Of-ITEMS-PER-PAGE"]
      const orderBy = localStorageTable["ORDER-BY"]
      const { videos, hasNext } =
        await getVideo({
          conditions: currPayload.conditions,
          searchType:currPayload.searchType,
          startIndex: null,
          readNextPage: true,
          size,
          orderBy,
        })
      
      prevStates[name] = {
        ...currPayload,
        pageNum: 0,
        pages: [videos],
        size,
        orderBy,
      }

      dispatchEvent(name, {videos, hasNext, hasBack: false, videoCardType: _currState.videocardType})
      return
    }
    break
    case 'FILE_READ_NEXT': {
      const prevPayload = prevStates[name]
      const newPageNum = prevPayload.pageNum + 1

        console.log(prevPayload)
      const { videos, hasNext } = 
        newPageNum < prevPayload.pages.length ? 
          { videos: prevPayload.pages[newPageNum], hasNext: newPageNum !==  prevPayload.pages.length - 1} :
          await getVideo({
            conditions: prevPayload.conditions,
            searchType:prevPayload.searchType,
            startIndex: prevPayload.pages[prevPayload.pages.length - 1].slice(-1)[0][prevPayload.orderBy],
            size: prevPayload.size,
            orderBy: prevPayload.orderBy,
            readNextPage: true
          })
      
      prevStates[name] = {
        ...prevPayload,
        pageNum: newPageNum,
        pages: newPageNum < prevPayload.pages.length ? prevPayload.pages : [...prevPayload.pages, videos],
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: true, videoCardType: prevPayload.videocardType})
      return
    }
    break
    case 'FILE_READ_BACK': {
      const prevPayload = prevStates[name]
      const newPageNum = prevPayload.pageNum - 1

      const { videos, hasNext } = { videos: prevPayload.pages[newPageNum], hasNext: true }
      
      prevStates[name] = {
        ...prevPayload,
        pageNum: newPageNum,
        pages: prevPayload.pages,
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: newPageNum > 0, videoCardType: prevPayload.videocardType})
      return
    }
    break
    case 'FILE_READ_REFRESH':{
      const currPayload = _currState.payload
      const prevPayload = prevStates[name]

      const size = localStorageTable["NUM-Of-ITEMS-PER-PAGE"]
      const orderBy = localStorageTable["ORDER-BY"]
      const { videos, hasNext } =
        await getVideo({
          conditions: prevPayload.conditions,
          searchType:prevPayload.searchType,
          startIndex: null,
          readNextPage: true,
          size,
          orderBy,
        })
      
      const newPages = (() => {
        const result = []
        const allItems = prevPayload.pages.flat()
        for(let i = 0; i < allItems.length; i += size){
          result[i] = []
          for(let j = 0; j < size; j++){
            result[i][j] = allItems.shift()
          }
        }
        return result
      })()

      prevStates[name] = {
        ...prevPayload,
        pageNum: 0,
        pages: newPages,
        size,
        orderBy,
      }
      console.log(videos)

      dispatchEvent(name, {videos, hasNext, hasBack: false, videoCardType: prevPayload.videocardType})
      return
    }
    break
    case 'FILE_SEARCH': {
      dispatchEvent(name, _currState.payload)
      return
    }
    case 'PRIM_DATA': {
      prevStates[name].payload.content = _currState.payload.content
    }
    break
    case 'MAIN_CONTENT': {
      dispatchEvent(name, _currState)
      currState[name] = _currState
      return
    }
    break
    case 'PAGE_UPDATE': {
      Object.assign(prevStates[name], _currState)
    }
    break
    default:{
      if(prevStates[name] == _currState) return
      prevStates[name] = _currState
    }
  }
  dispatchEvent(name, _currState)
  currState[name] = _currState
}

const dispatchEvent = async (name, state) => {
  if(events[name] == null) return;
  await Promise.all(
    events[name].map(callback => callback(state))
  )
}

export const observe = (name, callback, init) => {
  if(events[name] == null){
    events[name] = [callback]
  }else{
    events[name].push(callback)
  }
  prevStates[name] = init
  return [name, callback]
}

export const get = name => currState[name]

export const stop = (...ids) => {
  ids.filter(id => id != null).forEach(([name, callback]) => events[name] = events[name].filter(x => x != callback))
}
