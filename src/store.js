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
      const content = {
        ...currPayload,
        page: 0,
      }
      dispatchEvent(name, content)
      prevStates[name] = content
      return
    }
    break
    case 'FILE_READ_NEXT': {
      const prevPayload = prevStates[name]
      const content = Object.assign(prevPayload, {page: prevPayload.page + 1})
      dispatchEvent(name, content)
      prevStates[name] = content
      return
    }
    break
    case 'FILE_READ_BACK': {
      const prevPayload = prevStates[name]
      const content = Object.assign(prevPayload, {page: prevPayload.page - 1})
      dispatchEvent(name, content)
      prevStates[name] = content
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
    case 'BREADCRUMBS': {}
    break
    case 'MAIN_CONTENT': {
      // console.log(_currState.type, currState[name].type)
      // if(_currState.type !== currState[name].type){
        dispatchEvent(name, _currState)
      // }
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
