import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import TextButton from "@components/TextButton"
import { Box } from "@components/box";
import { useProjectStore } from '@hooks/useProjectStore';

const CATEGORIES = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'editorial',
    label: 'Editorial'
  },
  {
    value: 'commercial',
    label: 'Commercial'
  },
  {
    value: 'personal',
    label: 'Personal'
  },
]

const DownArrow = () => {
  return (
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 5L2 1H10L6 5Z" fill="black" stroke="black" />
    </svg>
  )
}

const ListItem = styled(motion(Box))`
  position: relative;
  padding: 0;
`

const CategoryList = ({ category, setCategory }) => {
  const [expanded, setExpanded] = useState(false);
  const { activeProject } = useProjectStore();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: activeProject ? 0 : 1 }}
      transition={{
        duration: 0.6,
        ease: 'circOut'
      }}
    >
      {/* Desktop */}
      <Box display={["none", null, "block"]} as="ul" width="100%" fontSize="44px" textAlign="center">
        {CATEGORIES.map((item, index) => {
          return (
            <Box
              key={`${item.value}-${index}`}
              as="li"
              display="inline-block"
              pr="4px"
              color={category === item.value ? '#000' : '#D7D7D7'}
            >
              <TextButton
                onClick={() => setCategory(item.value)}
              >
                <ListItem
                  as="button"
                  key="all"
                  initial={{ color: '#D7D7D7' }}
                  animate={{ color: category === item.value ? '#000' : '#D7D7D7' }}
                  exit={{ color: '#D7D7D7' }}
                  transition={{
                    duration: 0.25,
                    ease: 'linear'
                  }}
                >
                  {`${item.label}${index === CATEGORIES.length - 1 ? '' : ','}`}
                </ListItem>
              </TextButton>
            </Box>
          )
        })}
      </Box>

      {/* Mobile */}
      <Box display={["block", null, "none"]} as="ul" width="100%" fontSize="32px" textAlign="left" px="12px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex="1" display="grid" onClick={() => setExpanded(!expanded)}>
            <AnimatePresence exitBeforeEnter={false} initial={false}>
              {CATEGORIES.map(item => {
                if (item.value === category) {
                  return (
                    <Box key={item.value} overflow="hidden" position="relative" gridRow="1 / span 1" gridColumn="1 / span 1">
                      <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                          ease: [0.9, 0.15, 0.1, 0.87]
                        }}
                      >
                        {item.label}
                      </motion.div>
                    </Box>
                  )
                }
              })}
            </AnimatePresence>
          </Box>
          <DownArrow />
        </Box>
        <AnimatePresence exitBeforeEnter initial={false}>
          {expanded ? (
            <motion.div
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.9, 0.15, 0.1, 0.87],
              }}
            >
              {CATEGORIES.map((item, index) => {
                if (item.value === category) return null;
                return (
                  <Box
                    key={`${item.value}-${index}`}
                    as="li"
                    color={category === item.value ? '#000' : '#D7D7D7'}
                    my="-4px"
                  >
                    <TextButton
                      onClick={() => {
                        setCategory(item.value)
                        setExpanded(false)
                      }}
                    >
                      <ListItem
                        as="button"
                        key="all"
                        initial={{ color: '#D7D7D7' }}
                        animate={{ color: category === item.value ? '#000' : '#D7D7D7' }}
                        exit={{ color: '#D7D7D7' }}
                        transition={{
                          duration: 0.25,
                          ease: 'linear'
                        }}
                      >
                        {item.label}
                      </ListItem>
                    </TextButton>
                  </Box>
                )
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Box>
    </motion.div>
  )
}

export default CategoryList;