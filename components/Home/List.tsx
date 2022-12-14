import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import ProjectList from './ProjectList';
import CategoryList from './CategoryList';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const List = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');
  const scrollRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !container.current) {
      return;
    }

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
    });

    return () => {
      scroll.destroy()
      scrollRef.current = null;
    }
  }, [])

  return (
    <Box width="100%" ref={container} pb="100px" minHeight="100vh" pt="100px">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <CategoryList category={category} setCategory={setCategory} />
        <ProjectList projects={projects} />
      </motion.div>
    </Box>
  )
}

export default List;