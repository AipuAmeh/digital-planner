import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");

const Header = () => {
    const navigate = useNavigate();

    // make auth page for logging out upon expiration
    // show tasks only on log in
    // turn into hamburger for mobile
    const LogoutButton = () => {
        navigate("/");
        window.location.reload();
        localStorage.removeItem("token");
    };

    // create context
    // add loader data for header if token

    const isMobile = useBreakpointValue({ base: true, md: false, sm: false });

    return (
        <Box className="header-menu">
            {isMobile ?
                <>

                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                            m='0.5em'
                        />
                        <MenuList>
                            <MenuItem >
                                <Link to="/">Home</Link>
                            </MenuItem>
                            <MenuItem >
                                <Link to="/profile">Profile</Link>
                            </MenuItem>
                            {token ? (
                                <>

                                    <MenuItem >
                                        <Link to="/" onClick={LogoutButton}>Logout</Link>
                                    </MenuItem>
                                    <MenuItem >
                                        <Link to="/todo">Task</Link>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem >
                                        <Link to="/login">Login</Link>
                                    </MenuItem>
                                    <MenuItem  >
                                        <Link to="/signup">Sign up</Link>
                                    </MenuItem>

                                </>

                            )}


                        </MenuList>
                    </Menu>
                </> :
                <Flex direction="row" gap={5} justify="flex-end" mr="3em" pt="1em">
                    <h2>
                        <Link to="/">Home</Link>
                    </h2>
                    <Box>
                        {token ? (
                            <Box display='flex' gap={5}>
                                <h2 onClick={LogoutButton}>
                                    {" "}
                                    <Link to="/">Logout</Link>
                                </h2>
                                <h2>
                                    <Link to="/todo">Tasks</Link>
                                </h2>
                            </Box>
                        ) : (
                            <>
                                <Flex direction="row" gap="5">
                                    <h2>
                                        <Link to="/login">Login</Link>
                                    </h2>
                                    <h2>
                                        <Link to="/signup">Signup</Link>
                                    </h2>
                                </Flex>
                            </>
                        )}
                    </Box>
                    <h2>
                        <Link to="/profile">Profile</Link>
                    </h2>
                </Flex>
            }
        </Box>
    );
};

export default Header;
