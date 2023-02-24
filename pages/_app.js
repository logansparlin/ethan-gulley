import '../styles/globals.css'
import { useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Transition from '@components/Global/Transition';
import { useAppStore } from '@hooks/useAppStore';

function MyApp({ Component, pageProps, router }) {
  const { setIsMobile, isMobile } = useAppStore();
  useEffect(() => {
    const setDefaults = () => {
      document.documentElement.style.setProperty(
        '--vh',
        window.innerHeight * 0.01 + 'px'
      )

      const mobile = window.innerWidth < 768;
      if (isMobile !== mobile) setIsMobile(mobile)
    }

    setDefaults();

    window.addEventListener('resize', setDefaults)
    return () => {
      window.removeEventListener('resize', setDefaults)
    }
  })
  return (
    <LazyMotion features={domAnimation}>
      <Transition component={Component} pageProps={pageProps} path={router.asPath} />
    </LazyMotion>
  )
}

export default MyApp
