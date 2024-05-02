import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const date = new Date().toDateString();

const PriorityTodos = () => {
    type PrioritizedTodos = {
        id: number,
        todo: string,
        reflectionText: string,
        todaysDate: any,
        priority: string,
    };

    const data:any = useLoaderData();
    const loadedData = data.todos.data;
    const [todoData, setTodoData] = useState(loadedData);
    const headerMargin = useBreakpointValue({ base: '1.5em', sm: '1em', md: '2em', lg: '3em'});

    // for loop that groups tasks with high priority
    // for loop that groups tasks with medium priority
    // for loop that groups tasks with low priority
    // concat loop
    const prioritizedTodos = [];
    for (let i = 0; i < todoData.length; i++) {

    }

return (
    <Box>
        
    </Box>
)
}

export default PriorityTodos;