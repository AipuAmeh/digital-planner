import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

// drop down menu for sorting
// go to a new page that has all completed todos 
const SortByMenu = () => {

  return (
    <Box display="flex" justifyContent="flex-end" mr={20} mb={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        
        <MenuList>
        <MenuItem><ChakraLink as={ReactRouterLink} to='/todo'>
            All Tasks
              </ChakraLink></MenuItem>
          <MenuItem
          >
            <ChakraLink as={ReactRouterLink} to='/completed-todos'>
            Completed Tasks
              </ChakraLink></MenuItem>
          <MenuItem>Priority</MenuItem>
          <MenuItem>Date</MenuItem>

        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortByMenu;
