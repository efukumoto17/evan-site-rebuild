import Link from 'next/link';
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function NavBar() {
  return (
    <Box
      bg={useColorModeValue('blue.600', 'blue.900')}
      px={4}
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link href="/" passHref>
          <Button
            as="a"
            variant="ghost"
            colorScheme="whiteAlpha"
            fontWeight="bold"
            fontSize="xl"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Evan Fukumoto
          </Button>
        </Link>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="whiteAlpha"
            variant="ghost"
            _hover={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.300' }}
          >
            Spotify
          </MenuButton>
          <MenuList>
            <Link href="/whatsPlaying/home" passHref>
              <MenuItem as="a">
                What's Playing
              </MenuItem>
            </Link>
            <Link href="/whatsPlaying/playlistGenerator" passHref>
              <MenuItem as="a">
                Playlist Generator
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
