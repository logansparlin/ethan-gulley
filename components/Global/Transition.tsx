import { AnimatePresence } from "framer-motion";
import { useHomeStore } from "@hooks/useHomeStore";
import { Box } from "@components/box";

const Transition = ({ component, pageProps, path }): JSX.Element => {
  const { view } = useHomeStore();
  const Component = component;

  return (
    <AnimatePresence
      exitBeforeEnter
      initial={true}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} key={`${path}`} />
    </AnimatePresence>
  )
}

export default Transition;