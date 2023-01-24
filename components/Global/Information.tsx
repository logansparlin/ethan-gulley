import { useAppStore } from "@hooks/useAppStore";
import styled from 'styled-components';
import css from '@styled-system/css'
import { AnimatePresence, motion } from 'framer-motion';

import { Box } from "@components/box"
import { PortableText } from "@lib/sanity";

const StyledContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  color: white;
  top: 0;
  left: 0;
  background: black;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${css({
  overflow: ['scroll', null, 'hidden'],
  padding: ["12px", null, "20px"],
  fontSize: ['12px', null, '14px'],
  lineHeight: ['12px', null, '14px'],
})}
`

const StyledLink = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`

const StyledExhibition = styled.div`
  p {
    padding-top: 20px;
  }
`

const Information = ({
  contact,
  credits = [],
  clients = [],
  publications = [],
  selfPublications = [],
  exhibitions = []
}) => {
  const { informationOpen, setInformationOpen } = useAppStore();

  return (
    <AnimatePresence exitBeforeEnter>
      {informationOpen && (
        <StyledContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Box as="header" display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="flex-start" pb={["60px", null, 0]}>
            <Box as="h1" flex="1" fontSize={["26vw", null, "12vw"]} lineHeight={["23vw", null, "10vw"]} letterSpacing="-0.06em">Ethan Gulley</Box>
            <Box as="button" onClick={() => setInformationOpen(false)}>Close</Box>
          </Box>
          <Box as="main">
            <Box display={["block", null, "grid"]} gridTemplateColumns="repeat(4, 1fr)" gridGap="20px">
              <Box>
                <Box maxWidth="216px" pb={["0", null, "32px"]}>
                  <Box as="h2" pb={["12px", null, 0]}>Contact</Box>
                  <PortableText value={contact} />
                </Box>
                <Box display={["none", null, "block"]}>
                  <Box as="h2" pb={["12px", null, "32px"]}>Credits</Box>
                  <Box>
                    {credits.map(credit => {
                      return (
                        <div key={credit._key}>
                          <span>{credit.role}:</span>
                          <StyledLink href={credit.url} target="_blank" rel="noreferrer noopener">{credit.name}</StyledLink>
                        </div>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box as="h2" pb={["12px", null, "32px"]} pt={["75px", null, 0]}>Select Clients</Box>
                <Box as="ul">
                  {clients.map(client => {
                    return (
                      <li key={client._key}>{client.name}</li>
                    )
                  })}
                </Box>
              </Box>
              <Box pl={["88px", null, 0]}>
                <Box as="h2" pb={["12px", null, "32px"]} pt={["75px", null, 0]}>Select Publications</Box>
                <Box as="ul">
                  {publications.map(publication => {
                    return (
                      <li key={publication._key}>
                        {publication.url && (
                          <StyledLink href={publication.url} target="_blank" rel="noreferrer noopener">{publication.name}</StyledLink>
                        )}
                        {!publication.url && (
                          <span>{publication.name}</span>
                        )}
                      </li>
                    )
                  })}
                </Box>
              </Box>
              <Box>
                <Box pl={["88px", null, 0]}>
                  <Box as="h2" pb={["12px", null, "32px"]} pt={["36px", null, 0]}>Self Publications</Box>
                  <ul>
                    {selfPublications.map(publication => {
                      return (
                        <li key={publication._key}>
                          {publication.url && (
                            <StyledLink href={publication.url} target="_blank" rel="noreferrer noopener">{publication.name}</StyledLink>
                          )}
                          {!publication.url && (
                            <span>{publication.name}</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </Box>
                <Box pt={["75px", null, "32px"]}>
                  <Box as="h2" pb="12px">Exhibitions</Box>
                  <ul>
                    {exhibitions.map(exhibition => {
                      return (
                        <li key={exhibition._key}>
                          <StyledExhibition>
                            <PortableText value={exhibition.details} />
                          </StyledExhibition>
                        </li>
                      )
                    })}
                  </ul>
                </Box>
                <Box display={["block", null, "none"]} pt="63px" pb="12px">
                  <Box as="h2" pb={["12px", null, "32px"]}>Credits</Box>
                  <Box>
                    {credits.map(credit => {
                      return (
                        <div key={credit._key}>
                          <span>{credit.role}:</span>
                          <StyledLink href={credit.url} target="_blank" rel="noreferrer noopener">{credit.name}</StyledLink>
                        </div>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </StyledContainer>
      )}
    </AnimatePresence>
  )
}

export default Information;