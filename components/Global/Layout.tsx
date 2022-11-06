import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <motion.div
      key={`layout-${asPath}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
    >
      {children}
    </motion.div>
  )
}

export default Layout;