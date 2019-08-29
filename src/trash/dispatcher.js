const events = {}

export const addEvent = async (eventType, callBack) => {
  if(events[eventType] == null){
    events[eventType] = [callBack]
  }else{
    events.push(callBack)
  }
}

export const dispatchEvent = (eventType, payload) => {
  events[eventType].forEach(callback => callback(payload))
}
