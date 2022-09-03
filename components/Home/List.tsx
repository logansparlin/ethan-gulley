import { useState } from 'react';
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import ProjectList from './ProjectList';
import CategoryList from './CategoryList';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const List = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');

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