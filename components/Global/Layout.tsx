import { useEffect } from "react";
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
    <div>
      {children}
    </div>
  )
}

export default Layout;