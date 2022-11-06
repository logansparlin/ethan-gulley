import { AnimatePresence } from "framer-motion";

const Transition = ({ component, pageProps, path }): JSX.Element => {

  const Component = component;

  return (
    <AnimatePresence
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} key={path} />
    </AnimatePresence>
  )
}

export default Transition;