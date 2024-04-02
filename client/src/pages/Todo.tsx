import { useState } from "react";
import { Spacer, Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack} from '@chakra-ui/react'
import React from "react";
import TodoModal from "../components/TodoModal";
import { useLoaderData } from "react-router-dom";
import EditTodoModal from "../components/EditTodoModal";
import { DeleteIcon } from "@chakra-ui/icons";

// add full month calendar 
// add media queries
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
  const data: any = useLoaderData();
  console.log('TODO LOADER DATA:', data.todos.data);
  const loadedData = data.todos.data;
  const headerMargin = useBreakpointValue({ base: '1.5em', sm: '1em', md: '2em', lg: '3em'});
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
  // works for now but may not be permanent
  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    loadedData.filter((todoData: todosObject) => todoData.id !== id);
    window.location.reload();
    // setData(data.filter((todoData: todosObject) => todoData.id !== id));
  };

  return (
    <Box className="App">

      <Text
        className="verse"
        fontSize='2xl'
        mt={headerMargin}
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
                backgroundColor='#FFFFFA'
                style={style.border}
                key={todos?.id}
                size={{base: 'xs', sm: 'xs', md: 'sm', lg: 'sm'}}
                color='black'
                pb='1em'>
                <CardHeader
                  className='card-header'
                  display='flex'
                  alignContent='flex-end'
                  fontSize='lg'
                  pt={{base: '1em', sm: '1em'}}>
                  <Text
                    fontWeight='800'
                  > {todos?.todaysDate}</Text>
                  <Spacer></Spacer>
                  <Text
                  className='priority'
                    color={todos?.priority === 'Extremely Important!' ? "red" : todos?.priority === 'Coming soon.' ? "orange" : "green"}
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
          
                  gap='3'
                  flexDirection='row'
                  justify='flex-end'
                  mr='2em'
                >
                   <EditTodoModal id={todos?.id}/>
                    <DeleteIcon 
                    boxSize={6}
                    color='#371236'
                    onClick={() => deleteHandler(todos?.id)}
                    cursor='pointer'
                 
                    />
                   
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