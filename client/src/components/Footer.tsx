import { Text, Center, Box } from '@chakra-ui/react'

const styles = {
    border: {
        border: 'solid 2px',
    },
    
}
const Footer = () => {
    return (
        <Box style={styles.border}>
        <footer>
            <Center bgGradient='linear(to-l, #CEBACF, #B0A3D4)' >
            <Text>© 2024 ABA Creations</Text>
            </Center>
          
        </footer>
        </Box>

    )
};


export default Footer;