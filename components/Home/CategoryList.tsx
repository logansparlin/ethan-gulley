import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import TextButton from "@components/TextButton"
import { Box } from "@components/box";

const ListItem = styled(motion(Box))`
  position: relative;
`

const CategoryList = ({ category, setCategory }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Box as="ul" width="100%" fontSize="44px" textAlign="center">
        <Box
          as="li"
          pr="4px"
          color={category === 'all' ? '#000' : '#D7D7D7'}
        >
          <TextButton
            onClick={() => setCategory('all')}
          >
            <ListItem
              key="all"
              initial={{ color: '#D7D7D7' }}
              animate={{ color: category === 'all' ? '#000' : '#D7D7D7' }}
              exit={{ color: '#D7D7D7' }}
              transition={{
                duration: 0.35,
                ease: 'linear'
              }}
            >
              All,
            </ListItem>
          </TextButton>
        </Box>
        <Box
          as="li"
          pr="4px"
          color={category === 'editorial' ? '#000' : '#D7D7D7'}
        >
          <TextButton
            onClick={() => setCategory('editorial')}
          >
            <ListItem
              key="editorial"
              initial={{ color: '#D7D7D7' }}
              animate={{ color: category === 'editorial' ? '#000' : '#D7D7D7' }}
              exit={{ color: '#D7D7D7' }}
              transition={{
                duration: 0.35,
                ease: 'linear'
              }}
            >
              Editorial,
            </ListItem>
          </TextButton>
        </Box>
        <Box
          as="li"
          pr="4px"
          color={category === 'commercial' ? '#000' : '#D7D7D7'}
        >
          <TextButton
            onClick={() => setCategory('commercial')}
          >
            <ListItem
              key="commercial"
              initial={{ color: '#D7D7D7' }}
              animate={{ color: category === 'commercial' ? '#000' : '#D7D7D7' }}
              exit={{ color: '#D7D7D7' }}
              transition={{
                duration: 0.35,
                ease: 'linear'
              }}
            >
              Commercial,
            </ListItem>
          </TextButton>
        </Box>
        <Box
          as="li"
          color={category === 'personal' ? '#000' : '#D7D7D7'}
        >
          <TextButton
            onClick={() => setCategory('personal')}
          >
            <ListItem
              key="personal"
              initial={{ color: '#D7D7D7' }}
              animate={{ color: category === 'personal' ? '#000' : '#D7D7D7' }}
              exit={{ color: '#D7D7D7' }}
              transition={{
                duration: 0.35,
                ease: 'linear'
              }}
            >
              Personal
            </ListItem>
          </TextButton>
        </Box>
      </Box>
    </AnimatePresence>
  )
}

export default CategoryList;