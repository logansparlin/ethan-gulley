import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import CategoryList from './CategoryList';
import ProjectGrid from './ProjectGrid';

type Category = 'all' | 'editorial' | 'commercial' | 'personal';

const Grid = ({ projects }) => {
  const [category, setCategory] = useState<Category>('all');

  const handleChangeCategory = (category) => {
    setCategory(category);
  }

  return (
    <Box
      flex="1"
      pt={["60px", null, "100px"]}
      px={["0", null, "20px"]}
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      overflow="scroll"
      willChange="auto"
      transform="translate3d(0px, 0px, 0px)"
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
        <GridView projects={projects} category={category} handleChangeCategory={handleChangeCategory} />
      </motion.div>
    </Box>
  )
}

const GridView = ({ projects, category, handleChangeCategory }) => {
  const container = useRef(null);


  return (
    <Box width="100%" ref={container} pb="100px" minHeight="calc(var(--vh, 1vh) * 100)">
      <CategoryList category={category} setCategory={handleChangeCategory} />
      <ProjectGrid category={category} projects={projects} />
    </Box>
  )
}

export default Grid;