import { Box, Button, Center, Flex, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import authInstance from "../utils/auth";
// if not logged in, show buttons to sign up or log in
// if logged in, show users calendar on home page
const Home = () => {
  return (
    <Center>
      <Box
        display="flex"
        flexDirection="column"
        gap="1em"
        justifyContent="center"
        id="call-buttons"
        mt="8em"
      >
        <Flex justify="center">
          <Text fontSize="6xl" className="site-title">
            Chic Days.
          </Text>
        </Flex>
        { authInstance.loggedIn() ? false :
        <Center display="flex" flexDirection="column" gap="2em" pt="3em">
          <Link to='/login'>
          <Button
       
       className="call-buttons"
       backgroundColor="#371236"
       _hover={{ bg: "#F7F9F7", color: "black" }}
       color="white"
       size="lg"
       width="200px"
     >
      Login
     </Button>  
          </Link>
    <Link to='/signup'>
    <Button
            backgroundColor="#371236"
            _hover={{ bg: "#F7F9F7", color: "black" }}
            color="white"
            size='lg'
            width="200px"
          >
            Signup
          </Button>
    </Link>

        </Center>
}
      </Box>
    </Center>
  );
};

export default Home;
