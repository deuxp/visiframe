import { useState, useEffect } from "react";

function useTimeout(delay) {
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      // console.log("set false, timeId: ", id);
      setIsTrue(false);
    }, delay);
    return () => {
      // console.log("--- cleared id: ", id);
      clearTimeout(id);
    };
  }, [isTrue, delay]);

  return { isTrue, setIsTrue };
}

export default useTimeout;
