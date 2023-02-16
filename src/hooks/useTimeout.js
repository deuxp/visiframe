import { useState, useEffect } from "react";

function useTimeout(delay) {
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsTrue(false);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [isTrue, delay]);

  return { isTrue, setIsTrue };
}

export default useTimeout;
