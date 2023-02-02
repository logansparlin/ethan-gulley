import { useRouter } from 'next/dist/client/router'
import { useAppStore } from '@hooks/useAppStore'

import { motion } from 'framer-motion'
import { Box } from '@components/box'
import Link from 'next/link'

export const Header = ({ title, toggleOverview }) => {
  const router = useRouter();
  const { setTransitionType } = useAppStore();
  const onClose = () => {
    setTransitionType('page')
    router.push('/')
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'circOut' }}
    >
      <Box as="header" position="relative" zIndex="20" display="flex" justifyContent="space-between">
        <Box as="h1" p={["12px", null, "20px"]} color="black">{title}</Box>
        <Box display="flex">
          <Box
            as="button"
            type="button"
            height="auto"
            pr="24px"
            position="relative"
            zIndex="10"
            cursor="pointer"
            color={"#B4B4B4"}
            onClick={toggleOverview}
          >
            Overview
          </Box>
          <Box pr={["12px", null, "20px"]} pt={["12px", null, "20px"]} position="relative" zIndex="10" cursor="pointer" onClick={onClose}>
            Close
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}