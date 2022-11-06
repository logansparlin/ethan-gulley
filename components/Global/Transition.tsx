import { AnimatePresence } from "framer-motion";

const Transition = ({ component, pageProps, path }): JSX.Element => {

  const Component = component;

  return (
    <AnimatePresence
      exitBeforeEnter
      initial={true}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} key={`page-${path}`} />
    </AnimatePresence>
  )
}

export default Transition;