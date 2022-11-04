import { useState } from "react";
import { useHomeStore } from "@hooks/useHomeStore";
import { useAppStore } from '@hooks/useAppStore';
import { motion, AnimatePresence } from "framer-motion";

import { Box } from "@components/box";
import Head from 'next/head';
import Header from "@components/Header";
import Hero from "./Hero";
import Grid from "./Grid";
import List from "./List";
import Information from "@components/Global/Information";

export const HomeHead = () => (
  <Head>
    <title>Ethan Gulley</title>
    <meta name="description" content="Ethan Gulley Portfolio Site." />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Layout = ({ projects, site }) => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const { view, loaded } = useHomeStore();
  const { informationOpen } = useAppStore();

  const updateProject = (project) => {
    setActiveProject(project)
  }

  return (
    <Box>
      <AnimatePresence exitBeforeEnter>
        {informationOpen && <Information />}
      </AnimatePresence>
      <HomeHead />
      <motion.div
        initial={{ opacity: loaded ? 1 : 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4
        }}
      >
        <Header {...site} />
      </motion.div>
      <AnimatePresence exitBeforeEnter={true}>
        <Box key={view}>
          {view === 'default' &&
            <Hero
              projects={projects}
              activeProject={activeProject}
              updateProject={updateProject}
            />
          }
          {view === 'grid' && <Grid projects={projects} />}
          {view === 'list' && <List projects={projects} />}
        </Box>
      </AnimatePresence>
    </Box>
  )
}

export default Layout;