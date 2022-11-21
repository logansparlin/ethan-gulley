import { useMemo, useState } from "react";
import { useHomeStore } from "@hooks/useHomeStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";

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
    <link rel="icon" href="/favicon.png" />
  </Head>
)

const HomeLayout = ({ projects, site }) => {
  const { view, loaded, lastFocusedIndex } = useHomeStore();
  const [focusedProject, setFocusedProject] = useState(projects[lastFocusedIndex]);
  const { asPath } = useRouter();

  const updateProject = (newProject) => {
    setFocusedProject(newProject)
  }

  const transitionKey = useMemo(() => {
    return view === 'default' ? `${view}-${asPath}` : view
  }, [view, asPath])

  return (
    <Box>
      <Information />
      <HomeHead />
      <motion.div>
        <Header {...site} />
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        <Box key={transitionKey}>
          {view === 'default' &&
            <Hero
              projects={projects}
              focusedProject={focusedProject}
              updateProject={updateProject}
            />
          }
          {view === 'grid' && <Grid projects={projects} key="grid" />}
          {view === 'list' && <List projects={projects} key="list" />}
        </Box>
      </AnimatePresence>
    </Box>
  )
}

export default HomeLayout;