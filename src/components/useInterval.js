//I dont understand how this funtion works. 
//I fount it on this article : https://overreacted.io/making-setinterval-declarative-with-react-hooks/
//All I know Is that it works


import { useEffect, useRef} from 'react'

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default useInterval;