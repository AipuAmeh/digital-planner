import { Box, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom'

const token = localStorage.getItem('token');

const Header = () => {
    const navigate = useNavigate();

// make auth page for logging out upon expiration

    const LogoutButton = () => { 
        navigate('/');
        window.location.reload();
        localStorage.removeItem('token');
    };

    // create context
    // add loader data for header if token 
    return (
        <Box>
            <Flex direction='row' gap='5' justify="flex-end" mr='3em' pt='1em'>

                <h2><Link to='/'>Home</Link></h2>
                <Box>
                    {
                        token ? (
                            <h2
                                onClick={LogoutButton}> <Link to='/'>Logout</Link></h2>
                        ) :
                        <>
                            <Flex 
                            direction='row' 
                            gap='5'>
                                <h2><Link to='/login'>Login</Link></h2>
                                <h2><Link to='/signup'>Signup</Link></h2>
                            </Flex>
                            </>
                    }
                </Box>
                <h2><Link to='/profile'>Profile</Link></h2>
                <h2><Link to='/todo'>Tasks</Link></h2>
            </Flex>


        </Box>
    )
};


export default Header;