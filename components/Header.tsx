import { useHomeStore } from "@hooks/useHomeStore";
import { useAppStore } from "@hooks/useAppStore";
import { motion } from 'framer-motion';

import { Box } from "./box";
import Link from 'next/link';
import TextButton from "./TextButton";

const Header = ({ title, links }) => {
  const { view, setView, loaded } = useHomeStore();
  const { setInformationOpen, setTransitionType } = useAppStore();

  const updateView = (view) => {
    setView(view);
    setTransitionType('view');
  }
  return (
    <Box as="header" p="20px" width="100%" position="fixed" zIndex="10" fontSize="14px">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [.9, 0, .1, 0.9] }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link href="/">
            <TextButton onClick={() => updateView('default')}>
              {title}
            </TextButton>
          </Link>
          <Box as="ul">
            <Box
              as="li"
              display="inline-block"
              cursor="pointer"
              pr="4px"
              onClick={() => updateView(view === 'grid' ? 'default' : 'grid')}
              color={view === 'list' ? '#D7D7D7' : '#000'}
              transition="color 250ms ease-in-out"
            >
              Grid View,
            </Box>
            <Box
              as="li"
              display="inline-block"
              cursor="pointer"
              onClick={() => updateView(view === 'list' ? 'default' : 'list')}
              color={view === 'grid' ? '#D7D7D7' : '#000'}
              transition="color 250ms ease-in-out"
            >
              List View
            </Box>
          </Box>
          <Box as="ul">
            <Box as="li">
              <Box as="button" onClick={() => setInformationOpen(true)}>Information</Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}

export default Header;