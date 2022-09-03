import { useHomeStore } from "@hooks/useHomeStore";

import { Box } from "./box";
import Link from 'next/link';

const Header = ({ title, links }) => {
  const { view, setView } = useHomeStore();
  return (
    <Box as="header" p="20px" width="100%" position="fixed" zIndex="10">
      <Box display="flex" justifyContent="space-between" width="100%">
        <Link href="/">
          {title}
        </Link>
        <Box as="ul">
          <Box
            as="li"
            display="inline-block"
            cursor="pointer"
            pr="4px"
            onClick={() => setView(view === 'grid' ? 'default' : 'grid')}
            color={view === 'list' ? '#D7D7D7' : '#000'}
            transition="color 250ms ease-in-out"
          >
            Grid View,
          </Box>
          <Box
            as="li"
            display="inline-block"
            cursor="pointer"
            onClick={() => setView(view === 'list' ? 'default' : 'list')}
            color={view === 'grid' ? '#D7D7D7' : '#000'}
            transition="color 250ms ease-in-out"
          >
            List View
          </Box>
        </Box>
        <Box as="ul">
          {links.map(link => (
            <Box as="li" key={link._key}>
              <Link href={`/${link.page.slug.current}`}>{link.label}</Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Header;