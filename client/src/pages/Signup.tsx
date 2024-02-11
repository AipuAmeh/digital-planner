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
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// type signup = {

// }

function Signup() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (e: any) => {
        const {name, value } = e.target;
   setFormState({
    ...formState,
    [name]: value,
   });
    };

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:3001/auth/signup", {
            username: formState.username,
            email: formState.email,
            password: formState.password
            })
            alert('Welcome to digital planner!!');
            // console.log(response);
            navigate(`/todo/`);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Stack>
         <Center>
            <FormControl isRequired
            display="flex" 
            flexDirection="column" w="50%"
            >
                    <FormLabel>Username</FormLabel>
                    <Input
                        className="input"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange} />
                   
                    <FormLabel mt={4}>Email</FormLabel>
                    <Input
                        className="input"
                        placeholder="Email"
                        type="text"
                        name="email" 
                        value={formState.email}
                        onChange={handleChange}/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    <FormLabel mt={4}>Password</FormLabel>
                    <Input
                        className="input"
                        placeholder="Password"
                        type="password"
                        name="password" 
                        value={formState.password}
                        onChange={handleChange}/>
                        <Center>
                        <Button m={8} colorScheme='teal' size='lg'
                        type='submit'
                        onClick={handleClick}
                        >
                        Button
                    </Button>
                        </Center>
         
                </FormControl>
         </Center>
  
            
        </Stack>
    )
}

export default Signup;