import { getVideo } from './firebase/videoManager.js'
import { localStorageTable } from './localStorageManager.js'
import SearchBox from './SearchBox/SearchBox.js'

let events = {}

let prevStates = {
  PAGE_UPDATE:{
    payload:{content:[]}
  },
  INCLUDE_PATH:{
    payload:{}
  },
  FILE_SEARCH:{
    payload:{}
  }
}

const currState = {}

export const store = async (name, _currState) => {
  switch(_currState.type){
    case 'FILE_READ': {
      const currPayload = _currState.payload

      const { conditions, searchType } = currPayload
      const size = localStorageTable["NUM-Of-ITEMS-PER-PAGE"]
      const orderBy = localStorageTable["ORDER-BY"]

      const { videos, hasNext } =
        await getVideo(searchType,{
          conditions: currPayload.conditions,
          searchType:currPayload.searchType,
          startIndex: null,
          size,
          orderBy,
        })
      
      const getVideoFunc =
        async(pageNum, pages) => await getVideo(searchType, {
          startIndex: searchType == 'PERSONIZED-SEARCH' ? pageNum * size : pages[pages.length - 1].slice(-1)[0][orderBy],
          conditions,
          searchType,
          size,
          orderBy,
          readNextPage: true
        })
      
      prevStates[name] = {
        ...currPayload,
        pageNum: 0,
        pages: hasNext ? [videos] : [videos, null],
        getVideoFunc,
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: false, videoCardType: currPayload.videocardType})
      return
    }
    break
    case 'FILE_READ_REFRESH':{
      const prevPayload = prevStates[name]
      const { conditions, searchType } = prevPayload
      const size = localStorageTable["NUM-Of-ITEMS-PER-PAGE"]
      const orderBy = localStorageTable["ORDER-BY"]

      const newPages = (() => {
        const result = []
        const allItems = prevPayload.pages.flat()
        for(let i = 0; i < allItems.length; i += size){
          result[i] = []
          for(let j = 0; j < size; j++){
            result[i].push(allItems.shift())
          }
        }
        return result
      })()

      const { videos, hasNext } =
        await getVideo(searchType, {  //わざわざ呼ばなくても良いよね
          conditions: prevPayload.conditions,
          searchType:prevPayload.searchType,
          startIndex: null,
          size,
          orderBy,
        })

      const getVideoFunc =
          async(pageNum, pages) => await getVideo(searchType, {
            startIndex: pages[pages.length - 1].slice(-1)[0][orderBy],
            conditions,
            searchType,
            size,
            orderBy,
          })

      prevStates[name] = {
        ...prevPayload,
        getVideoFunc,
        pageNum: 0,
        pages: newPages,
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: false, videoCardType: prevPayload.videocardType})
      return
    }
    break
    case 'FILE_SEARCH': {
      const currPayload = _currState.payload
      const prevPayload = prevStates[name]
      
      const query = currPayload.query
      const size = localStorageTable["NUM-Of-ITEMS-PER-PAGE"]

      const getVideoFunc = async(pageNum) => await getVideo(currPayload.searchType, {query, page:pageNum, size})
      
      const { videos, nbPages } = await getVideoFunc(0)

      prevStates[name] = {
        ...currPayload,
        getVideoFunc,
        pageNum: 0,
        pages: nbPages > 1 ? [videos] : [videos, null],
      }

      await dispatchEvent(name, {videos, hasNext: nbPages > 1, hasBack: false, videoCardType: currPayload.videocardType})
      return
    }
    break
    case 'FILE_READ_NEXT': {
      const prevPayload = prevStates[name]
      const { pages, pageNum, videoCardType, getVideoFunc } = prevPayload
      const newPageNum = pageNum + 1

      const { videos, hasNext } = pages[newPageNum] != null ? 
                                    { videos: pages[newPageNum], hasNext: pages[newPageNum + 1] != null } :
                                    await getVideoFunc(newPageNum, pages)
      
      prevStates[name] = {
        ...prevPayload,
        pageNum: newPageNum,
        pages: newPageNum < pages.length ? pages : [...pages, videos],
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: true, videoCardType})
      return
    }
    break
    case 'FILE_READ_BACK': {
      const prevPayload = prevStates[name]
      const { pages, pageNum, videoCardType, getVideoFunc } = prevPayload
      const newPageNum = pageNum - 1

      const { videos, hasNext } = pages[newPageNum] != null ?
                                    { videos: pages[newPageNum], hasNext: true } :
                                    await getVideoFunc(newPageNum, pages)

      prevStates[name] = {
        ...prevPayload,
        pageNum: newPageNum,
        pages,
      }

      await dispatchEvent(name, {videos, hasNext, hasBack: newPageNum > 0, videoCardType})
      return
    }
    break
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
