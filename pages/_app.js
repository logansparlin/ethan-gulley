import '../styles/globals.css'
import { LazyMotion, domAnimation } from 'framer-motion'
import Transition from '@components/Global/Transition';

function MyApp({ Component, pageProps, router }) {
  return (
    <LazyMotion features={domAnimation}>
      <Transition component={Component} pageProps={pageProps} path={router.asPath} />
    </LazyMotion>
  )
}

export default MyApp
