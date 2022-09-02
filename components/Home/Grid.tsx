import { motion } from 'framer-motion';
import { useState } from 'react';

import { Box } from "@components/box"
import CategoryList from './CategoryList';
import ProjectGrid from './ProjectGrid';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const Grid = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');
  return (
    <Box flex="1" display="flex" pt="100px" px="20px" height="100vh" width="100%" overflow="scroll" willChange="auto">
      <motion.div
        style={{ flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <CategoryList category={category} setCategory={setCategory} />
        <ProjectGrid category={category} projects={projects} />
      </motion.div>
    </Box>
  )
}

export default Grid;