import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@hooks/useAppStore";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

const Layout = ({ children }) => {
  const { setTransitioning } = useAppStore();
  useEffect(() => {
    setTransitioning(false)
  }, [])
  return (
    <motion.div>
      {children}
    </motion.div>
  )
}

export default Layout;