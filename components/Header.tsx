import { Box } from "./box";
import Link from 'next/link';

const Header = ({ title, links }) => {
  return (
    <Box as="header" p="20px" width="100%" position="fixed">
      <Box display="flex" justifyContent="space-between" width="100%">
        <Link href="/">
          {title}
        </Link>
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