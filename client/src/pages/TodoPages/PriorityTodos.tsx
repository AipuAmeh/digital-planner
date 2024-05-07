import { Box, useBreakpointValue, Text, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SortByMenu from "../../components/Todo/SortByMenu";
import AllTodos from "../../components/Todo/AllTodos";

const date = new Date().toDateString();

const PriorityTodos = () => {
  type PrioritizedTodos = {
    id: number;
    todo: string;
    reflectionText: string;
    todaysDate: any;
    priority: string;
  };

  const data: any = useLoaderData();
  const loadedData = data.todos.data;
  const [todoData, setTodoData] = useState(loadedData);
  const headerMargin = useBreakpointValue({
    base: "1.5em",
    sm: "1em",
    md: "2em",
    lg: "3em",
  });

  // sort arrays by priority
  const high = [];
  const medium = [];
  const low = [];
  for (let i = 0; i < todoData.length; i++) {
    if (todoData[i].priority === "Extremely Important!") {
      high.push(todoData[i]);
    } else if (todoData[i].priority === "Coming soon.") {
      medium.push(todoData[i]);
    } else {
      low.push(todoData[i]);
    }
  }
  const finalArray = [...high, ...medium, ...low];

  // loop through arrays and return them on the page
  // in order of urgency
  return (
    <Box className="App">
      <Text className="verse" fontSize="3xl" mt={headerMargin} mb="2em">
        {date}
      </Text>

      <SortByMenu />

      <Stack className="rendered-todos" spacing="6" mx="10">
        {finalArray.map((todos: PrioritizedTodos) => {
          return (
            <AllTodos
            id={todos?.id}
            priority={todos?.priority}
            todo={todos?.todo}
            reflectionText={todos?.reflectionText}
            todaysDate={todos?.todaysDate}
            
            />
            // <AllTodos
            //   id={todos?.id}
            //   priority={todos?.priority}
            //   todo={todos?.todo}
            //   reflectionText={todos?.reflectionText}
            //   todaysDate={todos?.todaysDate}
            // />
          );
        })}
      </Stack>
    </Box>
  );
};

export default PriorityTodos;
