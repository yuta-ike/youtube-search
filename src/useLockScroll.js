import { useLayoutEffect } from 'react';

export default toggle => 
  useLayoutEffect(() => {
    if(toggle){
      document.body.setAttribute('style', 'overflow: hidden;')
    }else{
      document.body.removeAttribute('style', 'overflow: hidden;')
    }
  }, [toggle])