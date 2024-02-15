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
import { useToast } from '@chakra-ui/react'


const Signup = () => {
    const toast = useToast();
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
            if (formState.username === "" || formState.email === "" || formState.password === " ") {
                return toast({
                    title: 'Error',
                    description: 'Please create an account.',
                    status: 'error',
                    duration: 2000,
                  });; 
            } else {
            const response = await axios.post("http://localhost:3001/auth/signup", {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
                    })
                  
                    console.log('MY RESPONSE', response);
                const token = response.config.data;
                localStorage.setItem('token', token);
               setFormState({
                username: '',
                email: '',
                password: ''
               }); 
                toast({
                    title: 'Successfully logged in.',
                    description: `Welcome back ${formState.username}!`,
                    status: 'success',
                    duration: 2000,
                  })
                    navigate('/todo');
                }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Unable to log in.',
                status: 'error',
                duration: 2000,
              });
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
                        <Button m={8} 
                        size='lg'
                        type='submit'
                        color='white'
                        width='200px'
                        backgroundColor='#7D80DA' 
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