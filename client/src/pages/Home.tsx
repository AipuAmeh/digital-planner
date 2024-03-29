import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
        <Center display="flex" flexDirection="column" gap="2em" pt="3em">
          <Button
            backgroundColor="#371236"
            _hover={{ bg: "#F7F9F7", color: "black" }}
            color="white"
            size="lg"
            width="200px"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            backgroundColor="#371236"
            _hover={{ bg: "#F7F9F7", color: "black" }}
            color="white"
            size="lg"
            width="200px"
          >
            <Link to="/signup">Signup</Link>
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Home;
