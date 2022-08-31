import Head from 'next/head'
import { getHomePage } from '@lib/api';
import { PortableText } from '@lib/sanity';
import { Box } from '@components/box';

const HomeHead = () => (
  <Head>
    <title>Garden Variety</title>
    <meta name="description" content="Garden Variety is a creative development and product company." />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Home = ({ data }): JSX.Element => {
  const { pageData = {} } = data;

  if(!pageData) {
    return (
      <div>
        <HomeHead />
        No Page Data Available. Make sure you create a Home Page in Sanity Studio.
      </div>
    )
  }

  const { title, body } = pageData;
  
  return (
    <Box>
      <HomeHead />
      <h1>{title}</h1>
      <PortableText blocks={body} />
    </Box>
  )
}

export async function getStaticProps() {
  const { data: pageData, query } = await getHomePage();

  return {
    props: {
      data: {
        pageData,
        query
      }
    },
    revalidate: 1
  }
}

export default Home;
