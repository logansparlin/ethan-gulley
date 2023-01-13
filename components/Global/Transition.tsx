import { AnimatePresence } from "framer-motion";
import { useHomeStore } from "@hooks/useHomeStore";
import { Box } from "@components/box";

const Transition = ({ component, pageProps, path }): JSX.Element => {
  const { view } = useHomeStore();
  const Component = component;

  return (
    <AnimatePresence
      exitBeforeEnter={false}
      initial={true}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Box position="absolute" key={`${path}`} zIndex={path === '/' ? '1' : '2'} top="0" left="0" width="100%" height="100vh">
        <Component {...pageProps} />
      </Box>
    </AnimatePresence>
  )
}

export default Transition;