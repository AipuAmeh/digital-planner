
import { useLoaderData } from "react-router-dom";
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Stack, Textarea } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import axios from "axios";
import { useState, useEffect } from "react";
import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons'

const date = new Date().toDateString();

const Profile = () => {
  const data: any = useLoaderData();
  const [verse, setVerse] = useState('');
console.log('LOADER DATA:',data)
  // const style = {
  //   border: {
  //     'border': 'solid 4px #371236'
  //   },

  // };
// use loader data to add user info for account details
  const options = {
    method: 'GET',
    url: 'https://labs.bible.org/api/?',
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
      <Center display='flex' flexDirection='column'>
        <Text fontSize='3xl' p='3em' className="verse">{verse}</Text>

        <Text fontSize='xl' pb='2em'>{date}</Text>
      </Center>

    </Box>

  )
}


export default Profile;