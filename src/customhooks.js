import React, { useState, useEffect } from 'react';

export const useLazy = (promise, onPending) => {
  const [value, setValue] = useState(onPending)

  useEffect(() => {
    let cancelled = false
    promise.then((x) => {
      if(!cancelled){
        setValue(x)
      }
    })
    return () => {
      cancelled = true
    }
  })
  return [value]
}