import React, { useEffect, useState } from 'react'

interface DebounceProps{
    delay:number,
    value:any
}

const useDebounce = ({delay,value} : DebounceProps) => {
   const [debounceValue,setDebounceValue] = useState(value);

   useEffect(() => {
     const timer = setTimeout(()=>{
        setDebounceValue(value);
     },delay)
     
     return () => clearTimeout(timer);
   }, [value, delay])

   return debounceValue;
}
export default useDebounce;
