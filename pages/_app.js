import '../styles/globals.css'
import { useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Transition from '@components/Global/Transition';

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        '--vh',
        window.innerHeight * 0.01 + 'px'
      )
    }

    setVH();

    window.addEventListener('resize', setVH)
    return () => {
      window.removeEventListener('resize', setVH)
    }
  })
  return (
    <LazyMotion features={domAnimation}>
      <Transition component={Component} pageProps={pageProps} path={router.asPath} />
    </LazyMotion>
  )
}

export default MyApp
