
import { useLoaderData } from "react-router-dom";
import { Box, Button, Card, CardBody, CardHeader, Center, Stack } from '@chakra-ui/react';
import {  Text } from '@chakra-ui/react'
import axios from "axios";
import { useState, useEffect } from "react";

const date = new Date().toDateString();

const Profile = () => {
    const data:any  = useLoaderData();
    const [verse, setVerse] = useState('');
    const [todoData, setData] = useState<todosObject[]>([]);
   console.log('LOADER DATA:', data);

   type todosObject = {
    id: number,
    todo: string,
    reflectionText: string
    todaysDate: any;
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
            <h2>Today's Date: {date}</h2>
                {/* <Text fontSize='2xl' pt='3em' >Verse of the Day: </Text> */}
              <Text fontSize='2xl' p='3em' className="verse">{verse}</Text>
            </Center>
            <Stack  className="rendered-todos" spacing='6' px='2em'>

            
            {
              todoData.map((todos: todosObject) => {
                return (
                  <Card 
                  backgroundColor='#371236' 
                  key={todos?.id} 
                  size={"sm"} 
                  color='white'
                  p='1em' >
                    <CardHeader
                      fontSize='lg'>Todo: {todos?.todo}</CardHeader>
                    <CardBody
                      // onChange={(e: any) => setReflection(e.target.value)}
                      fontSize='md'>Intention: {todos?.reflectionText}</CardBody>
                        <Center>
                      <Button
                        maxW={'60%'}
                        size={'sm'}
                        _hover={{ bg: '#F7F9F7', color: 'black' }}
                        onClick={() => deleteHandler(todos?.id)}
                        color='black'
                        width='200px'
                        backgroundColor='#CEBACF' >
                          Delete</Button>
                    </Center>
         

                  </Card>
                )
              })
            }
            </Stack>
            {/* <Stack spacing='4' px='4em' display='flex'>
             
    <Card  id='hour-7' size='md' className='time-block'>
    <Text pl='2em'>7AM</Text>  
      <CardHeader display='flex'>
        <Heading size='md'> Todo:
        <textarea className="description pl-3"></textarea>
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-8' size='md' className='time-block'>
    <Text pl='2em'>8AM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-10' size='md' className='time-block'>
    <Text pl='2em'>10AM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-11' size='md' className='time-block'>
    <Text pl='2em'>11AM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-12' size='md' className='time-block'>
    <Text pl='2em'>12AM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-1' size='md' className='time-block'>
    <Text pl='2em'>1PM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-2' size='md' className='time-block'>
    <Text pl='2em'>2PM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-3' size='md' className='time-block'>
    <Text pl='2em'>3PM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-4' size='md' className='time-block'>
    <Text pl='2em'>4PM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

    <Card  id='hour-5' size='md' className='time-block'>
    <Text pl='2em'>5PM</Text>  
      <CardHeader>
        <Heading size='md'> Todo:</Heading>
      </CardHeader>
      <CardBody>
        <Text>Reflection:</Text>
      </CardBody>
    </Card>

</Stack> */}

           </Box>

    )
}


export default Profile;