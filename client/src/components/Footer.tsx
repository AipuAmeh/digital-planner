import { Text, Center, Box } from '@chakra-ui/react'
    
const Footer = () => {
    return (
        <Box 
        as='footer'
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        >
            <Center bgGradient='linear(to-l, #CEBACF, #B0A3D4)' >
            <Text>© 2024 ABA Creations</Text>
            </Center>
        </Box>

    )
};


export default Footer;