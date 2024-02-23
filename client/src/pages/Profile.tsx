
import { useLoaderData } from "react-router-dom";
import { Box, Button, Center } from '@chakra-ui/react';
import {  Text } from '@chakra-ui/react'
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
    const data:any  = useLoaderData();
    // const token = localStorage.getItem('token');
    // const [verse, setVerse] = useState([]);
   console.log('LOADER DATA:', data);

    const options = {
        method: 'GET',
        url:  'https://labs.bible.org/api/?',
          params: {
            passage: 'votd',
            formatting: 'plain'
          },
        origin: true
    };

    // useEffect(() => {
    //     getBibleVersions();
    // }, [getBibleVersions]);

    const getBibleVersions = async () => {
        try {
            const verseResponse = await axios.request(options);
            console.log(verseResponse.data);
            return 
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box>
            <Text fontSize='3xl' display='flex'  pl='2em'> Welcome back {data.username}!</Text>
            <Center>
                <Text>Verse of the Day: </Text>
                {
                    <>
            
                </>
                }
    <Button
    onClick={getBibleVersions}>Click to view VOTD</Button>
            </Center>
        </Box>

    )
}


export default Profile;