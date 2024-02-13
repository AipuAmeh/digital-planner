import {
    FormControl,
    FormLabel,
    Button,
    Stack,
    Center,
    Input
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // useEffect(() => {
    //     axios.get("http//localhost:3001/auth/user")
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    // }, []);

    // now that token is in storage, get token when going to users profile page
    const handleClick = async () => {
        try {
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
            navigate('/todo');
            alert("You're logged in!");
        } catch (error) {
            
        }
    }


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
   
};


export default Login;