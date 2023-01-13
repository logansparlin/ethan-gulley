import { useEffect } from "react";
import { useAppStore } from "@hooks/useAppStore";
import { useProjectStore } from "@hooks/useProjectStore";

const Layout = ({ children }) => {
  const { setTransitioning } = useAppStore();
  const { setActiveProject } = useProjectStore();

  useEffect(() => {
    setTimeout(() => {
      setTransitioning(false);
      setActiveProject(null);

    }, 600)
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default Layout;