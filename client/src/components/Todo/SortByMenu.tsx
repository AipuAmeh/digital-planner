import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

// drop down menu for sorting
// when menu item clicked, show component of completed tasks

const SortByMenu = () => {
  return (
    <Box display="flex" justifyContent="flex-end" mr={10} mb={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem>Completed Tasks</MenuItem>
          <MenuItem>Priority</MenuItem>
          <MenuItem>Date</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortByMenu;
