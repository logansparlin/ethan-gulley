import { useAppStore } from "@hooks/useAppStore";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { Box } from "@components/box"
import { PortableText } from "@lib/sanity";

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
              <Box maxWidth="216px" pb="32px">
                <Box as="h2">Contact</Box>
                <PortableText value={contact} />
              </Box>
              <Box>
                <Box as="h2" pb="32px">Credits</Box>
                <Box>
                  {credits.map(credit => {
                    return (
                      <div key={credit._key}>
                        <span>{credit.role}:</span>
                        <StyledLink href={credit.url} target="_blank" rel="noreferrer noopener">{credit.person}</StyledLink>
                      </div>
                    )
                  })}
                </Box>
              </Box>
            </Box>
            <Box>
              <Box as="h2" pb="32px">Select Clients</Box>
              <Box as="ul">
                {clients.map(client => {
                  return (
                    <li key={client._key}>{client.name}</li>
                  )
                })}
              </Box>
            </Box>
            <Box>
              <Box as="h2" pb="32px">Select Publications</Box>
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
              <Box>
                <Box as="h2" pb="32px">Self Publications</Box>
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
              <Box pt="32px">
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
            </Box>
          </Box>
        </Box>
      </StyledContainer>}
    </AnimatePresence>
  )
}

export default Information;