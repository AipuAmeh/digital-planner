import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Button, Center } from '@chakra-ui/react';

const Profile = () => {
    const data = useLoaderData();
    // const navigate = useNavigate();
    console.log('LOADER DATA', data);



    return (
        <Box>This is my profile page.
            <Center>

            </Center>
        </Box>

    )
}


export default Profile;