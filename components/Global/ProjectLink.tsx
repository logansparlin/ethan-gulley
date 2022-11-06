import { Box } from "@components/box";
import { useRouter } from "next/dist/client/router";
import { useAppStore } from "@hooks/useAppStore";

const ProjectLink = ({ children, to }) => {
  const { setTransitioning } = useAppStore();
  const router = useRouter();

  const handleClick = () => {
    setTransitioning(true)
    setTimeout(() => {
      router.push(to)
    }, 10)
  }

  return (
    <Box as="button" onClick={handleClick}>
      {children}
    </Box>
  )
}

export default ProjectLink;