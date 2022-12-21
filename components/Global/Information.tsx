import { useAppStore } from "@hooks/useAppStore";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const StyledContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  color: white;
  top: 0;
  left: 0;
  background: black;
  z-index: 100;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  line-height: 14px;
`

import { Box } from "@components/box"

const Information = () => {
  const { informationOpen, setInformationOpen } = useAppStore();
  return (
    <AnimatePresence exitBeforeEnter>
      {informationOpen && <StyledContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <Box as="header" display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box as="h1" fontSize="12vw" lineHeight="10vw" letterSpacing="-0.06em">Ethan Gulley</Box>
          <Box as="button" onClick={() => setInformationOpen(false)}>Close</Box>
        </Box>
        <Box as="main">
          <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridGap="20px">
            <Box>
              <Box as="h2" pb="32px">Get in Touch</Box>
              <Box>
                <p>E: <a href="mailto:ethan.gulley@gmail.com">ethan.gulley@gmail.com</a></p>
                <p>IG: <a href="https://instagram.com/ethangulley" rel="noreferrer" target="_blank">@ethangulley</a></p>
              </Box>
            </Box>
            <Box>
              <Box as="h2" pb="32px">Select Clients</Box>
              <Box as="ul">
                <li>Nike</li>
                <li>Levis</li>
                <li>Apple</li>
                <li>Ford</li>
                <li>Paper Magazine</li>
                <li>Vogue Magazine</li>
                <li>Under Armour</li>
                <li>Stella McCartney</li>
                <li>Lululemon</li>
                <li>Goop</li>
                <li>W Hotels</li>
                <li>Happy Socks</li>
                <li>Set Active</li>
                <li>Freshly</li>
                <li>MedMen</li>
                <li>Alternative Apparel</li>
                <li>Golden Road Brewing</li>
                <li>Calidad Beer</li>
                <li>Goldenvoice</li>
                <li>Blind Barber</li>
                <li>Alpha Industries</li>
              </Box>
            </Box>
            <Box>
              <Box as="h2" pb="32px">Select Publications</Box>
              <Box as="ul">
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Paper Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Hypebeast</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">The Photographic Journal</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Native Instruments</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Sports Illustrated</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Vogue Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Booooooom,</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Live FAST Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">C-Heads Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">The Photographic Journal</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Cake Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Woven Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Live FAST Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">MC1R Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Woven Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Rogue Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Cinestill Film</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Live FAST Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Pond Magazine</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Sticks & Stones</a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">Cake Magazine Issue 17</a>
                </li>
              </Box>
            </Box>
            <Box>
              <Box as="h2" pb="32px">Self Publications</Box>
            </Box>
          </Box>
        </Box>
      </StyledContainer>}
    </AnimatePresence>
  )
}

export default Information;