import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Center } from '@chakra-ui/react';

const Profile = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    console.log('LOADER DATA', data);

    const LogoutButton = () => {
        navigate('/');
       localStorage.removeItem('token');
     
    };

    return (
        <Box>This is my profile page.
            <Center>
                <Button m={8} colorScheme='teal' size='lg'
                    type='submit'
                    onClick={LogoutButton}
                >
                    Button
                </Button>
            </Center>
        </Box>

    )
}


export default Profile;