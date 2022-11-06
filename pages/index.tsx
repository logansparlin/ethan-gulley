import { getHomePage } from '@lib/api';

import HomeLayout, { HomeHead } from '@components/Home/Layout';
import Layout from '@components/Global/Layout'

const Home = ({ pageData }): JSX.Element => {

  if (!pageData) {
    return (
      <div>
        <HomeHead />
        No Page Data Available. Make sure you create a Home Page in Sanity Studio.
      </div>
    )
  }

  const { projects, site } = pageData;

  return (
    <Layout>
      <HomeLayout projects={projects} site={site} />
    </Layout>
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
