import {
    FormControl,
    FormLabel,
    Button,
    Stack,
    Center,
    Input,
    Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleClick = async () => {
        try {
            if (formState.username === "" || formState.password === "") {
                return toast({
                    title: 'Error',
                    description: 'Please log in',
                    status: 'error',
                    duration: 2000,
                });
            } else {
                const response = await axios.post("http://localhost:3001/auth/login/", {
                    username: formState.username,
                    password: formState.password
                });
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                setFormState({
                    username: '',
                    password: ''
                }
                );
                toast({
                    title: 'Successfully logged in.',
                    description: `Welcome back ${formState.username}!`,
                    status: 'success',
                    duration: 2000,
                })
                navigate('/todo');
                window.location.reload();
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
    }


    return (
        <Stack>
              <Text mx='auto' pt='2em' fontSize='3xl'>Log in to your Account</Text>
            <Center>
              
                <FormControl isRequired
                    display="flex"
                    flexDirection="column" w='65%' pt="3em"
                >
                    <FormLabel>Username</FormLabel>
                    <Input
                        className="input"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <FormLabel mt={4}>Password</FormLabel>
                    <Input
                        className="input"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Center>
                        <Button m={8} 
                         size='lg'
                        color='white'
                        width='200px'
                        backgroundColor='#371236' 
                        _hover={{ bg: '#B0A3D4' }}
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

};


export default Login;