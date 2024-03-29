import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import styled from 'styled-components'
import css from '@styled-system/css'

import { motion, AnimatePresence } from 'framer-motion'
import { Box } from "@components/box"
import { HoverImage } from "./HoverImage"
import Link from "next/link"
import { useAppStore } from "@hooks/useAppStore"

const DELAY = 0.025;
const DURATION = 0.65;

const YearUnderline = styled(motion.div)`
  width: 100%;
  height: 1px;
  background: black;
  margin-bottom: 3px;
  transform-origin: 0 0;
  
  ${css({
  display: ['none', null, 'block']
})}
`

const StyledYear = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  left: 0;
  
  ${css({
  top: [0, null, '100%'],
  position: ['relative', null, 'absolute'],
  fontSize: ['156px', null, 'inherit'],
  lineHeight: ['136px', null, 'inherit'],
  pb: ['8px', null, 0]
})}
`;

const Project = styled(motion.button)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0;

  ${css({
  fontSize: ["26px", null, "14px"],
  lineHeight: ["135.5%", null, "20px"],
})}
`

const ProjectList = ({ projects, category }) => {
  const [years, setYears] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { setTransitionType, isMobile } = useAppStore();
  const router = useRouter();


  useEffect(() => {
    const sorted = projects.filter(project => {
      if (category === 'all') {
        return project;
      }

      return project.category === category
    })
      .sort((a, b) => a.year < b.year ? 1 : -1)
      .map((project, index) => {
        return {
          ...project,
          animateIndex: index
        }
      })

    setSortedProjects(sorted)

    const set = new Set();
    sorted.forEach(project => {
      set.add(project.year)
    })

    setYears([...set].sort().reverse());

  }, [projects, category])

  const handleProjectClick = (slug) => {
    setTransitionType('list');
    router.push(`/projects/${slug}`)
  }

  return (
    <AnimatePresence exitBeforeEnter={true}>
      <Box pt={["50px", null, "100px"]} className="list-view" px={["12px", null, "20px"]} fontSize="14px" key={category}>
        <Box width="100%">
          {years.map((year, index) => {
            return (
              <Box key={`${year}-${index}`} width="100%" display="flex" flexDirection="column" alignItems="flex-end">
                <Box width="100%" position="relative">
                  <YearUnderline
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 1, opacity: 0, transition: { delay: 0 } }}
                    transition={{ duration: DURATION, ease: [0.85, 0.1, 0, 1], delay: DELAY * sortedProjects.find(project => project.year === year).animateIndex }}
                  />
                  <StyledYear
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ duration: DURATION, ease: [0.85, 0.1, 0, 1], delay: DELAY * sortedProjects.find(project => project.year === year).animateIndex }}
                  >
                    <Box as="span" display={["none", null, "block"]}>{year}</Box>
                    <Box as="span" display={["block", null, "none"]}>{year.toString().slice(-2)}</Box>
                  </StyledYear>
                </Box>
                {sortedProjects.map(project => {
                  if (project.year !== year || (category !== 'all' && project.category !== category)) return null;
                  return (
                    <Link href={`/projects/${project.slug?.current}`} key={project._id}>
                      <Project
                        key={project._id}
                        className="list-view-item"
                        width="100%"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0 } }}
                        onMouseEnter={() => setActiveId(project._id)}
                        onMouseLeave={() => setActiveId(null)}
                        onClick={() => handleProjectClick(project.slug?.current)}
                        transition={{
                          duration: DURATION, ease: 'easeInOut', delay: DELAY * project.animateIndex
                        }}
                      >
                        {!isMobile ? <HoverImage image={project.images?.length >= 1 ? project.images[0] : project.image} active={project._id === activeId} /> : null}
                        <Box
                          width={["100%", null, "50%"]}
                          key={project._id}
                          display="flex"
                          justifyContent="space-between"
                          className="list-view-item__content"
                        >
                          <Box>{project.title}</Box>
                          <Box display={["none", null, "block"]}>{project.images?.length.toString().padStart(2, '0') || '00'}</Box>
                        </Box>
                      </Project>
                    </Link>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </Box>
    </AnimatePresence>
  )
}

export default ProjectList;
