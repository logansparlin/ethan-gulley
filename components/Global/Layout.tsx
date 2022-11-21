import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@hooks/useAppStore";
import { useProjectStore } from "@hooks/useProjectStore";

const Layout = ({ children }) => {
  const { setTransitioning } = useAppStore();
  const { setActiveProject } = useProjectStore();

  useEffect(() => {
    setTransitioning(false);
    setActiveProject(null);
  }, [])

  return (
    <motion.div>
      {children}
    </motion.div>
  )
}

export default Layout;