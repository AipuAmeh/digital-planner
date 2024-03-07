
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

  const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    setData(todoData.filter((todoData: todosObject) => todoData.id !== id))
  };

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
     
        {/* <Text fontSize='2xl' pt='3em' >Verse of the Day: </Text> */}
        <Text fontSize='3xl' p='3em' className="verse">{verse}</Text>

        <Text fontSize='xl' pb='2em'>{date}</Text>
      </Center>
      <Stack className="rendered-todos" spacing='6' px='2em'>
        {
          
              todoData.map((todos: todosObject) => {
                return (
                  <Card 
                  backgroundColor='#FFFFFA' 
                  style={style.border}
                  key={todos?.id} 
                  size={"sm"} 
                  color='black'
                  p='1em' >
                    <CardHeader
                      fontSize='lg'>
                        <Text 
                        fontWeight='800'>{todos?.todaysDate}</Text>
                        <Text mt='1em'>{todos?.todo}</Text>
                        </CardHeader>
                    <CardBody
                      fontSize='md'>{todos?.reflectionText}</CardBody>
                        <Flex justify='flex-end'>
                      <Button
                        maxW={'60%'}
                        size={'sm'}
                        _hover={{ bg: '#F7F9F7', color: 'black' }}
                        onClick={() => deleteHandler(todos?.id)}
                        color='black'
                        width='200px'
                        backgroundColor='#CEBACF' >
                          Delete</Button>
                    </Flex>
         

                  </Card>
                )
              })
            }
      </Stack>
     

    </Box>

  )
}


export default Profile;