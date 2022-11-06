import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

const Layout = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

export default Layout;