import { useState, useEffect } from 'react';
import { useWindowSize } from "./useWindowSize";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 832)
  }, [width])

  return isMobile;
}