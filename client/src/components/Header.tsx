import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Box>
            <Flex direction='row' gap='5' justify="flex-end" mr='3em' pt='1em'>
                <h2><Link to='/'>Home</Link></h2>
                <h2><Link to='/login'>Login</Link></h2>
                <h2><Link to='/signup'>Signup</Link></h2>
                <h2><Link to='/todo'>Todo</Link></h2>


            </Flex>
            <Flex justify='center'>
                <Text fontSize='6xl' fontStyle='san-serif'>Digital Planner</Text>
            </Flex>


        </Box>
    )
};


export default Header;