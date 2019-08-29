import { searchVideoWithCategory, searchVideoWithIndividualData } from './firebase/videoManager.js'
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
      const {payload} = _currState
      payload.content =
        payload.searchType === 'GENERAL_DATA'
          ? await searchVideoWithCategory(payload.hierarchy, payload.limit, 0)
          : await searchVideoWithIndividualData(payload.limit)
      payload.startIndex = payload.content.length + 1
      prevStates[name] = _currState
    }
    break
    case 'FILE_READ_MORE': {
      const {payload} = prevStates[name]
      const nextContent =
        payload.searchType === 'GENERAL_DATA'
          ? await searchVideoWithCategory(payload.hierarchy, _currState.payload.limit, payload.startIndex)
          : await searchVideoWithIndividualData(_currState.payload.limit, payload.startIndex)

      _currState.payload.content = [...payload.content, ...nextContent]
      _currState.payload.searchType = payload.searchType
      _currState.payload.hierarchy = payload.hierarchy
      _currState.payload.startIndex = _currState.payload.content.length + 1

      prevStates[name] = _currState
    }
    break
    case 'PRIM_DATA': {
      prevStates[name].payload.content = _currState.payload.content
    }
    break
    case 'BREADCRUMBS': {}
    break
    case 'MAIN_CONTENT': {}
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

const dispatchEvent = (name, state) => {
  if(events[name] == null) return
  events[name].forEach(callback => callback(state))
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
