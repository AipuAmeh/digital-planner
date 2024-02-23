
import { useLoaderData } from "react-router-dom";
import { Box, Center } from '@chakra-ui/react';
import {  Text } from '@chakra-ui/react'
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
    const data:any  = useLoaderData();
    const [verse, setVerse] = useState('');
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

    const getBibleVerses = async () => {
        try {
            const verseResponse = await axios.request(options);
            console.log(verseResponse.data);
            setVerse(verseResponse.data);
            return 
        } catch (error) {
            console.error(error);
        }
    }
getBibleVerses();
    return (
        <Box>
            <Text fontSize='xl' display='flex'  pl='2em'> Welcome back {data.username}!</Text>
            <Center display='flex' flexDirection='column'>
                <Text fontSize='2xl'>Verse of the Day: </Text>
              <Text fontSize='xl' p='2em'>{verse}</Text>
            </Center>
        </Box>

    )
}


export default Profile;