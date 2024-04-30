import { useState } from "react";
import { Spacer, Flex, Box, Text, useBreakpointValue, Button, } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack} from '@chakra-ui/react'
import React from "react";
import TodoModal from "../components/Todo/TodoModal";
import { useLoaderData } from "react-router-dom";
import EditTodoModal from "../components/Todo/EditTodoModal";
import { DeleteIcon } from "@chakra-ui/icons";
// commenting out checkbox until working again
import CompletedCheckBox from "../components/Todo/CompletedCheckBox";
import SortByMenu from "../components/Todo/SortByMenu";


export type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
  completed: boolean
};



const date = new Date().toDateString();

const Todo = () => {
  const data: any = useLoaderData();
  const loadedData = data.todos.data;
  const [todoData, setTodoData] = useState(loadedData)
  const headerMargin = useBreakpointValue({ base: '1.5em', sm: '1em', md: '2em', lg: '3em'});
  const style = {
    border: {
      'border': 'solid 4px #371236'
    },
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    setTodoData(loadedData.filter((todoData: todosObject) => todoData.id !== id));
    window.location.reload();
  };

// when checkbox is clicked, task is 
// placed in new array, shown when toggled
const completedTodos = [];
for (let i = 0; i < todoData.length; i++) {
  if (todoData[i].completed === true) {
    completedTodos.push(todoData[i]);
  }
}
completedTodos.forEach(item => {
  const index = todoData.indexOf(item);
  if (index !== -1) {
    todoData.splice(index, 1);
  }
});
loadedData.push(...completedTodos);

console.log('COMPLETED TODOS ARRAY', completedTodos);
console.log('TODO DATA', todoData);
  return (
    <Box className="App">

      <Text
        className="verse"
        fontSize='3xl'
        mt={headerMargin}
        mb='2em'>{date}</Text>

      <TodoModal setCurrentData={setTodoData}/>
< SortByMenu />
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
                   <CompletedCheckBox 
                   id={todos?.id} 
                   setData={setTodoData}/>
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
                  justify={{base: 'center', sm: 'center', md:'flex-end', lg: 'flex-end'}}
                  mr={{base: '0', sm: '0', md: '2em', lg: '2em'}}
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