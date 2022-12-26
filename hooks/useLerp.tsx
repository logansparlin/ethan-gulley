import { useEffect, useRef } from "react"

export const useLerp = (cb?: (value: number) => void, threshold?: number) => {
  const value = useRef(0)
  const targetRef = useRef(0);

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end
  }

  const update = (target: number) => {
    targetRef.current = target;
  }

  const animate = () => {
    value.current = lerp(value.current, targetRef.current, threshold ?? 0.2);
    cb(value.current)
  }

  useEffect(() => {
    const interval = setInterval(animate, 1000 / 60);

    return () => {
      clearInterval(interval)
    }
  }, [])

  return {
    update
  };
}