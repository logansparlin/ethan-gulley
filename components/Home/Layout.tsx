import { urlFor } from "@lib/sanity"

import { Box } from "@components/box";
import Head from 'next/head';
import Header from "@components/Header";
import Hero from "./Hero";
import { useState } from "react";

export const HomeHead = () => (
  <Head>
    <title>Ethan Gulley</title>
    <meta name="description" content="Ethan Gulley Portfolio Site." />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Layout = ({ projects, site }) => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const updateProject = (project) => {
    setActiveProject(project)
  }

  return (
    <Box>
      <HomeHead />
      <Header {...site} />
      <Hero projects={projects} activeProject={activeProject} updateProject={updateProject} />
    </Box>
  )
}

export default Layout;