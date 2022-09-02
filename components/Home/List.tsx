import { motion } from 'framer-motion';

import { Box } from "@components/box"

const List = ({ projects }) => {
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6
        }}
      >
        <Box>List</Box>
      </motion.div>
    </Box>
  )
}

export default List;