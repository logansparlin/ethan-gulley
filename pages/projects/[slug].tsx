import { getProject, getProjectPaths } from "@lib/api";
import { ProjectPage } from "@components/Project/ProjectPage";

const Project = ({ pageData }) => {
  if (!pageData) return "no page data"

  return <ProjectPage data={pageData} />
}

export async function getStaticProps({ params }) {
  const { data: pageData, query } = await getProject(params.slug);

  return {
    props: {
      pageData,
      query
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const { data: paths } = await getProjectPaths();

  return {
    paths,
    fallback: true
  };
}

export default Project;