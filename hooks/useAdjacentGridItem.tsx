import { useEffect, useState } from "react";

type AdjacentGridItemReturn = {
  indices: any;
  updateIndices: any;
  clearIndices: () => void;
}

export const useAdjacentGridItem = (breakpoints): AdjacentGridItemReturn => {
  const [indices, setIndices] = useState(null);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !breakpoints) return null;
    const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => Number(b) - Number(a))
    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoint = sortedBreakpoints.find(bp => Number(bp) <= width)

      if (breakpoint) {
        setCols(breakpoints[breakpoint])
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const updateIndices = (index) => {
    const id = index + 1;
    const remainder = id % cols;
    const isStart = remainder === 1;
    const isEnd = remainder === 0;
    let ids = []

    if (!isStart) ids = [...ids, index - 1, (index - cols - 1), (index + cols - 1)]
    if (!isEnd) ids = [...ids, index + 1, (index + cols + 1), (index - cols + 1)]

    ids = [...ids, index + cols, index - cols]

    setIndices(ids)
  }

  const clearIndices = () => {
    setIndices(null);
  }

  return {
    indices,
    updateIndices,
    clearIndices
  }
}