import {
    FormControl,
    FormLabel,
    // FormErrorMessage,
    FormHelperText,
    Button,
    Stack,
    Center,
    Input
} from '@chakra-ui/react'

// type signup = {

// }

function Signup() {

//     const [formState, setFormState] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const handleChange = (e: any) => {
//         const {name, value } = e.target;
//    setFormState({
//     ...formState,
//     [name]: value,
//    });
//     };

    // const handleClick = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:3001/user", {

    //         })
    //     } catch (error) {
            
    //     }
    // }
    
    return (
        <Stack>
            <h1>This is my signup page</h1>
            <h2>Working on pushing branch</h2>
         <Center>
            <FormControl display="flex" flexDirection="column" w="50%">
                    <FormLabel>Username</FormLabel>
                    <Input
                        className="input"
                        placeholder="Username"
                        type="text"
                        name="username" />
                   
                    <FormLabel mt={4}>Email</FormLabel>
                    <Input
                        className="input"
                        placeholder="Email"
                        type="text"
                        name="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    <FormLabel mt={4}>Password</FormLabel>
                    <Input
                        className="input"
                        placeholder="Password"
                        type="text"
                        name="password" />
                        <Center>
                        <Button m={8} colorScheme='teal' size='lg'>
                        Button
                    </Button>
                        </Center>
         
                </FormControl>
         </Center>
  
            
        </Stack>
    )
}

export default Signup;