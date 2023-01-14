import { useEffect, useState, useRef } from "react"
import styled from 'styled-components'

import { motion } from 'framer-motion'
import { Box } from "@components/box"
import { HoverImage } from "./HoverImage"
import Link from "next/link"

const DELAY = 0.03;
const DURATION = 0.6;

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

const ProjectList = ({ projects }) => {
  const [years, setYears] = useState([]);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const set = new Set();
    const sorted = projects.sort((a, b) => a.year < b.year ? 1 : -1);
    const withIndex = sorted.map((project, index) => {
      return {
        ...project,
        animateIndex: index
      }
    })

    setSortedProjects(withIndex)
    projects.forEach(project => {
      set.add(project.year)
    })

    setYears([...set].sort().reverse());
  }, [projects]);

  return (
    <Box pt="100px" className="list-view" px="20px" fontSize="14px">
      <Box width="100%">
        {years.map((year, index) => {
          return (
            <Box key={`${year}-${index}`} width="100%" display="flex" flexDirection="column" alignItems="flex-end">
              <Box width="100%" position="relative">
                <YearUnderline
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 1, transition: { delay: 0 } }}
                  transition={{ duration: DURATION, ease: [0.85, 0.1, 0, 1], delay: DELAY * sortedProjects.find(project => project.year === year).animateIndex }}
                />
                <StyledYear
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 1, x: 0, transition: { delay: 0 } }}
                  transition={{ duration: DURATION, ease: [0.85, 0.1, 0, 1], delay: DELAY * sortedProjects.find(project => project.year === year).animateIndex }}
                >{year}</StyledYear>
              </Box>
              {sortedProjects.map(project => {
                if (project.year !== year) return null;
                return (
                  <Link href={`/projects/${project.slug?.current}`}>
                    <Project
                      key={project._id}
                      className="list-view-item"
                      width="100%"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 1, transition: { delay: 0 } }}
                      onMouseEnter={() => setActiveId(project._id)}
                      onMouseLeave={() => setActiveId(null)}
                      transition={{
                        duration: DURATION, ease: 'linear', delay: DELAY * project.animateIndex
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
  )
}

export default ProjectList;
