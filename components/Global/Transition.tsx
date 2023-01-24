import { AnimatePresence } from "framer-motion";
import { useHomeStore } from "@hooks/useHomeStore";
import { Box } from "@components/box";
import { useRouter } from "next/dist/client/router";
import { useAppStore } from "@hooks/useAppStore";

const Transition = ({ component, pageProps, path }): JSX.Element => {
  const { asPath } = useRouter();
  const { view } = useHomeStore();
  const { transitionType } = useAppStore();
  const Component = component;

  return (
    <AnimatePresence
      exitBeforeEnter={
        (view === 'default' && asPath !== '/')
          || transitionType === 'project'
          ? true : false
      }
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Box position="absolute" key={`${path}`} zIndex={path === '/' ? '1' : '2'} top="0" left="0" width="100%" height="calc(var(--vh, 1vh) * 100)">
        <Component {...pageProps} />
      </Box>
    </AnimatePresence>
  )
}

export default Transition;