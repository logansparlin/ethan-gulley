import TextButton from "@components/TextButton"
import { Box } from "@components/box";

const CategoryList = ({ category, setCategory }) => {
  return (
    <Box as="ul" width="100%" fontSize="44px" textAlign="center">
      <Box
        as="li"
        pr="4px"
        color={category === 'all' ? '#000' : '#D7D7D7'}
        transition="color 250ms ease-in-out"
      >
        <TextButton
          onClick={() => setCategory('all')}
        >
          All,
        </TextButton>
      </Box>
      <Box
        as="li"
        pr="4px"
        color={category === 'editorial' ? '#000' : '#D7D7D7'}
        transition="color 250ms ease-in-out"
      >
        <TextButton
          onClick={() => setCategory('editorial')}
        >
          Editorial,
        </TextButton>
      </Box>
      <Box
        as="li"
        pr="4px"
        color={category === 'commercial' ? '#000' : '#D7D7D7'}
        transition="color 250ms ease-in-out"
      >
        <TextButton
          onClick={() => setCategory('commercial')}
        >
          Commercial,
        </TextButton>
      </Box>
      <Box
        as="li"
        color={category === 'personal' ? '#000' : '#D7D7D7'}
        transition="color 250ms ease-in-out"
      >
        <TextButton
          onClick={() => setCategory('personal')}
        >
          Personal
        </TextButton>
      </Box>
    </Box>
  )
}

export default CategoryList;