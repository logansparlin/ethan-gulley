import { useState } from "react";
import { useHomeStore } from "@hooks/useHomeStore";
import { AnimatePresence } from "framer-motion";

import { Box } from "@components/box";
import Head from 'next/head';
import Header from "@components/Header";
import Hero from "./Hero";
import Grid from "./Grid";
import List from "./List";
import Loading from './Loading';

export const HomeHead = () => (
  <Head>
    <title>Ethan Gulley</title>
    <meta name="description" content="Ethan Gulley Portfolio Site." />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Layout = ({ projects, site }) => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const { view } = useHomeStore();

  const updateProject = (project) => {
    setActiveProject(project)
  }

  return (
    <Box>
      <HomeHead />
      <Header {...site} />
      <AnimatePresence exitBeforeEnter={true}>
        <Box key={view}>
          {view === 'loading' && <Loading projects={projects} site={site} />}
          {(view === 'default' || view === 'loading') &&
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