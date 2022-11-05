import '../styles/globals.css'
import { AnimatePresence, m } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence
      exitBeforeEnter={true}
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <m.div key={router.route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Component {...pageProps} />
      </m.div>
    </AnimatePresence>
  )
}

export default MyApp
