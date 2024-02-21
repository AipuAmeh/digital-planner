import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Button, Center } from '@chakra-ui/react';
import { useToast, Text } from '@chakra-ui/react'
import axios from "axios";

const Profile = () => {
    const data:any  = useLoaderData();
   
    const options = {
        method: 'GET',
        url:  'http://labs.bible.org/api/?',
          params: {
            passage: 'votd',
            formatting: 'plain'
          },

    };

    const getBibleVersions = async () => {
        try {
            const response = await axios.request(options);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
   
    }

    return (
        <Box>
            <Text fontSize='3xl' display='flex'  pl='2em'> Welcome back {data.username}!</Text>
            <Center>
                <Text>Verse of the Day: </Text>
    <Button
    onClick={getBibleVersions}>Click to view VOTD</Button>
            </Center>
        </Box>

    )
}


export default Profile;