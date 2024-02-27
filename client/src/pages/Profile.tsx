
import { useLoaderData } from "react-router-dom";
import { Box, Card, CardBody, CardHeader, Center, Flex, Heading, Stack } from '@chakra-ui/react';
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
            <Text fontSize='md' display='flex'  pl='2em' justifyContent='flex-end' noOfLines={[1, 2]}> Welcome back {data.username}!</Text>
            <Center display='flex' flexDirection='column'>
                <Text fontSize='2xl' pt='3em'>Verse of the Day: </Text>
              <Text fontSize='xl' p='2em'>{verse}</Text>
            </Center>
            <Stack spacing='4' maxWidth='75%'>
  {['md', 'md', 'md', 'md'].map((size) => (
    <Card key={size} size={size}>
      <CardHeader>
        <Heading size='md'> {size}</Heading>
      </CardHeader>
      <CardBody>
        <Text>size = {size}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
           </Box>

    )
}


export default Profile;