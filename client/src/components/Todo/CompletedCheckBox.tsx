import { Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { todosObject } from "../../pages/Todo";

type Props = {
id: number;
setData: React.Dispatch<React.SetStateAction<todosObject>>
}

const CompletedCheckBox = ({ id, setData }: Props) => {

const completedTodo = async () => {
   axios
   .patch(
    `http://localhost:3001/todo/mark-complete/${id}`
   )
   .then((response) => {
    setData(response.data);
    window.location.reload();

   })
   .catch((error) => {
    console.error(error);
   })
  
    };

    return (
        <Checkbox
        display='flex'
        justifyContent='flex-end' 
        mr='0.5em'
        onChange={completedTodo}>         
        </Checkbox>
    )
};

export default CompletedCheckBox;

