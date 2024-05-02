import { Box, Stack, useBreakpointValue, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllTodos from "../components/Todo/AllTodos";
import SortByMenu from "../components/Todo/SortByMenu";

const date = new Date().toDateString();

const CompletedTodos = () => {
    type CompletedTodos = {
        id: number,
        todo: string,
        reflectionText: string,
        todaysDate: any,
        priority: string,
    };

    const data: any = useLoaderData();
    const loadedData = data.todos.data;
    const [todoData, setTodoData] = useState(loadedData);
    const headerMargin = useBreakpointValue({ base: '1.5em', sm: '1em', md: '2em', lg: '3em'});

    // completed todos pushed to new array
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

    // return tasks looped through completedTodos array
    return (
      <Box className="App">
        <Text
        className="verse"
        fontSize='3xl'
        mt={headerMargin}
        mb='2em'>{date}</Text>

        <SortByMenu />

        <Stack
        className="rendered-todos"
        spacing='6'
        mx='10'
        >
           {
            completedTodos.map((todos: CompletedTodos) => {
                return (
                    <AllTodos id={todos?.id} priority={todos?.priority} todo={todos?.todo} reflectionText={todos?.reflectionText} todaysDate={todos?.todaysDate} 
                    />
                )
            })
           }
        </Stack>
      </Box>

    )
}

export default CompletedTodos;