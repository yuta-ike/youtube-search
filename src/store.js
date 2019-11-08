import { getVideo } from './firebase/videoManager.js'

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
      const { videos, hasNext } =
        await getVideo({
          conditions: currPayload.conditions,
          searchType:currPayload.searchType,
          startIndex: null,
          size: 20,//settings.itemsPerRow * settings.itemsPerColumn,
          readNextPage: true
        })
      
      prevStates[name] = {
        ...currPayload,
        pageNum: 0,
        pages: [videos],
      }

      dispatchEvent(name, {videos, hasNext, hasBack: false, videoCardType: _currState.videocardType})
      return
    }
    break
    case 'FILE_READ_NEXT': {
      const prevPayload = prevStates[name]
      const newPageNum = prevPayload.pageNum + 1

      const { videos, hasNext } = 
        newPageNum < prevPayload.pages.length ? 
          { videos: prevPayload.pages[newPageNum], hasNext: true } :
          await getVideo({
            conditions: prevPayload.conditions,
            searchType:prevPayload.searchType,
            startIndex: prevPayload.pages[prevPayload.pages.length - 1].slice(-1)[0].index,
            size: 20,//settings.itemsPerRow * settings.itemsPerColumn,
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
