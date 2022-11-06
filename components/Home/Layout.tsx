import { useState } from "react";
import { useHomeStore } from "@hooks/useHomeStore";
import { useAppStore } from "@hooks/useAppStore";
import { motion, AnimatePresence } from "framer-motion";

import { Box } from "@components/box";
import Head from 'next/head';
import Header from "@components/Header";
import Hero from "./Hero";
import Grid from "./Grid";
import List from "./List";
import Information from "@components/Global/Information";
import { Project } from "@components/Project/Project";
import { useProjectStore } from "@hooks/useProjectStore";

export const HomeHead = () => (
  <Head>
    <title>Ethan Gulley</title>
    <meta name="description" content="Ethan Gulley Portfolio Site." />
    <link rel="icon" href="/favicon.png" />
  </Head>
)

const HomeLayout = ({ projects, site }) => {
  const [focusedProject, setFocusedProject] = useState(projects[0]);
  const { activeProject } = useProjectStore();
  const { view, loaded } = useHomeStore();
  const { transitioning } = useAppStore();

  const updateProject = (project) => {
    setFocusedProject(project)
  }

  return (
    <Box>
      <Information />
      {activeProject && <Project />}
      <HomeHead />
      <motion.div>
        <Header {...site} />
      </motion.div>
      <AnimatePresence exitBeforeEnter={true} initial={true}>
        {!transitioning && <Box key={view}>
          {view === 'default' &&
            <Hero
              projects={projects}
              focusedProject={focusedProject}
              updateProject={updateProject}
            />
          }
          {view === 'grid' && <Grid projects={projects} key="grid" />}
          {view === 'list' && <List projects={projects} key="list" />}
        </Box>}
      </AnimatePresence>
    </Box>
  )
}

export default HomeLayout;