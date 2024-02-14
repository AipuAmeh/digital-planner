import { Box, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <Center>

       
       <Box display="flex" flexDirection="column" gap="1em" justifyContent='center' id="call-buttons" mt='8em'>
          <Button colorScheme='teal' size='lg' >
   <Link to='/login'>Login</Link>
  </Button>
  <Button colorScheme='teal' size='lg'>
   <Link to='/signup'>Signup</Link>
  </Button>
       </Box>
       </Center>
    )
};


export default Home;