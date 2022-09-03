import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import CategoryList from './CategoryList';
import ProjectGrid from './ProjectGrid';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const Grid = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');
  const scrollRef = useRef(null);
  const container = useRef(null);

  const handleChangeCategory = (category) => {
    setCategory(category);
  }

  return (
    <Box
      flex="1"
      pt="100px"
      px="20px"
      width="100%"
      height="100vh"
      overflow="hidden"
      willChange="auto"
    >
      <motion.div
        style={{ flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <GridView key={category} projects={projects} category={category} handleChangeCategory={handleChangeCategory} />
      </motion.div>
    </Box>
  )
}

const GridView = ({ projects, category, handleChangeCategory }) => {
  const scrollRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !container.current) {
      return;
    }
    console.log('mounting')

    let scroll;
    import("locomotive-scroll").then((LocomotiveScroll) => {
      scroll = new LocomotiveScroll.default({
        el: container.current,
        smooth: true,
        tablet: {
          smooth: true
        },
        smartphone: {
          smooth: true
        }
      });
      scrollRef.current = scroll;
      console.log(scroll)
    });

    return () => {
      scroll.destroy()
      scrollRef.current = null;
    }
  }, [])

  return (
    <Box width="100%" ref={container} pb="100px" minHeight="100vh">
      <CategoryList category={category} setCategory={handleChangeCategory} />
      <motion.div
        style={{ flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <ProjectGrid category={category} projects={projects} />
      </motion.div>
    </Box>
  )
}

export default Grid;