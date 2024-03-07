
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
  const [todoData, setData] = useState<todosObject[]>([]);
  console.log('LOADER DATA:', data);

  type todosObject = {
    id: number,
    todo: string,
    reflectionText: string
    todaysDate: any
    priority: string
  };

  const style = {
    border: {
      'border': 'solid 4px #371236'
    },

  };

  useEffect(() => {
    axios.get("http://localhost:3001/todo/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
  }, []);


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
      <Text fontSize='md' display='flex' pl='2em' justifyContent='flex-end' noOfLines={[1, 2]}> Welcome back {data.username}!</Text>
      <Center display='flex' flexDirection='column'>
        <Text fontSize='3xl' p='3em' className="verse">{verse}</Text>

        <Text fontSize='xl' pb='2em'>{date}</Text>
      </Center>

    </Box>

  )
}


export default Profile;