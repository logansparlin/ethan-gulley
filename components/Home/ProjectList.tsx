import { useEffect, useState, useRef } from "react"
import styled from 'styled-components'
import { useRouter } from "next/dist/client/router"

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
`

const StyledYear = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 100%;
`;

const Project = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const ProjectList = ({ projects, category }) => {
  const [years, setYears] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { setTransitionType } = useAppStore();
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
      <Box pt="100px" className="list-view" px={["12px", null, "20px"]} fontSize="14px" key={category}>
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
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0, transition: { delay: 0 } }}
                    transition={{ duration: DURATION, ease: [0.85, 0.1, 0, 1], delay: DELAY * sortedProjects.find(project => project.year === year).animateIndex }}
                  >{year}</StyledYear>
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
                        <HoverImage image={project.images?.length >= 1 ? project.images[0] : project.image} active={project._id === activeId} />
                        <Box
                          width="50%"
                          key={project._id}
                          display="flex"
                          justifyContent="space-between"
                          className="list-view-item__content"
                          fontSize="14px"
                          lineHeight="20px"
                        >
                          <Box>{project.title}</Box>
                          <Box>{project.images?.length.toString().padStart(2, '0') || '00'}</Box>
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
