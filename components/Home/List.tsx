import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import ProjectList from './ProjectList';
import CategoryList from './CategoryList';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const List = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');
  const container = useRef(null);

  return (
    <Box width="100%" ref={container} pb="100px" height="calc(var(--vh, 1vh) * 100)" overflow="scroll" pt={["60px", null, "100px"]} transform="translate3d(0px, 0px, 0px)">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <CategoryList category={category} setCategory={setCategory} />
        <ProjectList projects={projects} category={category} />
      </motion.div>
    </Box >
  )
}

export default List;