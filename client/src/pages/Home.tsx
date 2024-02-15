import { Box, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <Center>

       
       <Box display="flex" flexDirection="column" gap="1em" justifyContent='center' id="call-buttons" mt='8em'>
          <Button 
          backgroundColor='#371236' 
          _hover={{ bg: '#B0A3D4' }}
          color='white' 
          size='lg'
          width='200px' >
   <Link to='/login'>Login</Link>
  </Button>
  <Button 
  backgroundColor='#371236' 
  _hover={{ bg: '#B0A3D4' }}
  color='white' 
  size='lg'
  width='200px'>
   <Link to='/signup'>Signup</Link>
  </Button>
       </Box>
       </Center>
    )
};


export default Home;