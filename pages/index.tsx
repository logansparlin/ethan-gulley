import { getHomePage } from '@lib/api';

import Layout, { HomeHead } from '@components/Home/Layout';

const Home = ({ pageData }): JSX.Element => {

  if(!pageData) {
    return (
      <div>
        <HomeHead />
        No Page Data Available. Make sure you create a Home Page in Sanity Studio.
      </div>
    )
  }

  const { projects, site } = pageData;
  
  return (
    <Layout projects={projects} site={site} />
  )
}

export async function getStaticProps() {
  const { data: pageData, query } = await getHomePage();

  return {
    props: {
      pageData,
      query
    },
    revalidate: 1
  }
}

export default Home;
