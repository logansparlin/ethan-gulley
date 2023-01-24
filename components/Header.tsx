import { useHomeStore } from "@hooks/useHomeStore";
import { useAppStore } from "@hooks/useAppStore";
import { motion } from 'framer-motion';

import { Box } from "./box";
import Link from 'next/link';
import TextButton from "./TextButton";
import { useProjectStore } from "@hooks/useProjectStore";

const Header = ({ title }) => {
  const { view, setView, loaded } = useHomeStore();
  const { activeProject } = useProjectStore();
  const { setInformationOpen, setTransitionType } = useAppStore();

  const updateView = (view) => {
    setView(view);
    setTransitionType('view');
  }
  return (
    <Box as="header" p={["12px", null, "20px"]} width="100%" position="fixed" zIndex="10" fontSize={["12px", null, "14px"]}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeProject ? 0 : loaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: 'circOut'
        }}
      >
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" alignItems="center" width="100%">
          <Box textAlign="left">
            <Link href="/">
              <TextButton onClick={() => updateView('default')}>
                {title}
              </TextButton>
            </Link>
          </Box>
          <Box as="ul" textAlign="center">
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
          <Box textAlign="right">
            <Box as="button" p="0" onClick={() => setInformationOpen(true)}>Information</Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}

export default Header;