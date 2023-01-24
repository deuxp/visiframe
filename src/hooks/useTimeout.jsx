import { useState, useEffect } from "react";

function useTimeout(delay) {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("set false, timeId: ", id);
      setIsAlertVisible(false);
    }, delay);
    return () => {
      console.log("--- cleared id: ", id);
      clearTimeout(id);
    };
  }, [isAlertVisible, delay]);

  return { isAlertVisible, setIsAlertVisible };
}

export default useTimeout;
