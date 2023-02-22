import { useState, useEffect } from 'react';
import { useWindowSize } from "./useWindowSize";

export const useIsMobile = () => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(width < 832);

  useEffect(() => {
    setIsMobile(width < 832)
  }, [width])

  return isMobile;
}