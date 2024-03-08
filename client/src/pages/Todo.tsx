import { useState, useEffect } from "react";
import { Spacer,  Flex, Box } from "@chakra-ui/react";
import {  Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import axios from "axios";
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
import React from "react";
import TodoModal from "../components/TodoModal";
import { useLoaderData } from "react-router-dom";

type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
};
const date = new Date().toDateString();

const Todo = () => {
const data:any = useLoaderData();
console.log('TODO LOADER DATA:', data.todos.data);
const loadedData = data.todos.data;
  const [todoData, setData] = useState<todosObject[]>([]);

  const style = {
    border: {
      'border': 'solid 4px #371236'
    },
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // not deleting immediately, figure out why
  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    loadedData.filter((todoData: todosObject) => todoData.id !== id);
    
    // setData(data.filter((todoData: todosObject) => todoData.id !== id));
  };

  return (
    <Box className="App">

<Text 
className="verse"
fontSize='2xl'
mt='5em' 
mb='2em'>{date}</Text>

      <TodoModal />
      <Stack
        className="rendered-todos" 
        spacing='6' 
        mx='10'>
        {
          loadedData.map((todos: todosObject) => {
            return (
              <Card
                overflow='hidden'
                // justify='space-between'
                backgroundColor='#FFFFFA'
                style={style.border}
                key={todos?.id}
                size='sm'
                color='black'
                pb='1em'>
                <CardHeader
                display='flex'
                alignContent='flex-end'
                  fontSize='lg'>
                  <Text
                    fontWeight='800'
                  > {todos?.todaysDate}</Text>
                  <Spacer></Spacer>
                  <Text  
                  mr='1em'
                  fontWeight='700'>{todos?.priority}</Text>
                </CardHeader>
                <CardBody
                  fontSize='md'>
                  <Text my='10px'>{todos?.todo}</Text>
                  <Text>
                    {todos?.reflectionText}
                  </Text>

                </CardBody>

                <Flex 
                justify='flex-end' 
                mr='1em'
                >
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

  );
}

export default Todo;