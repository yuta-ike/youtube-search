import { useState } from "react"
import useLocalStorage from 'react-use-localstorage';

export const localStorageTable = {}

const useStateWithLocalStorage = (name, init) => {
  const [_, setState] = useState()
  const [storageValue, setStorageValue] = useLocalStorage(name, init)
  if(!(name in localStorageTable)){
    if(localStorage[name] == null){
      localStorage[name] = init
      localStorageTable[name] = init
    }else{
      localStorageTable[name] = localStorage[name]
    }
  }

  const set = (v) => {
    console.log(v)
    localStorageTable[name] = v
    setState(v)
    setStorageValue(v)
  }
  return [storageValue, set]
}

export default useStateWithLocalStorage
