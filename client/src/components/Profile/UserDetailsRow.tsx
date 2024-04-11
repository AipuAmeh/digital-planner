import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../pages/Signup";
import { useToast,  useBreakpointValue  } from "@chakra-ui/react";
import { Data } from "../../pages/Profile";

type Props = {
  field: string;
  value: string;
  username: string;
  setData: React.Dispatch<React.SetStateAction<Data>>
};

const UserDetailsRow = ({ field, value, username, setData}: Props) => {
  const toast = useToast();
  const [updateField, setUpdates] = useState(false);
  const [valueState, setValueState] = useState(value);
  const [error, setError] = useState(false);
  const fontSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg', lg: 'lg' });

  const onChange = (e: any) => {
    setValueState(e.target.value);
  };

  const onClickEdit = () => {
    setUpdates(!updateField);
  };

  const onClickCheck = async () => {
    if (field === "Email") {
      const invalidEmail = isInvalidEmail(valueState);
      if (invalidEmail) {
        toast({
          title: "Error",
          description: `Please enter a valid email.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      } 
    } else {
        if (valueState === '') {
            toast({
                title: "Error",
                description: `Please enter a value.`,
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              return;
        } else {
          const existingUser = await axios.get("http://localhost:3001/user");
          console.log(existingUser);
          for (let i = 0; i < existingUser.data.length; i++) {
            if (existingUser.data[i].username === valueState) {
              setError(true);
              return toast({
                title: 'Error',
                description: 'Username already exists.',
                status: 'error'
              });
            } 
          } 
        }
    } 


    
    const token = localStorage.getItem("token");

    setUpdates(!updateField);
    axios
      .post(
        "http://localhost:3001/auth/change-account-details/",
        {
          username,
          field: field.toLowerCase(),
          value: valueState,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setData(response.data);
        toast({
            title: "Success!",
            description: `Successfully updated account details.`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
      }).catch((error) => {
        console.log(error);
        toast({
            title: "Error",
            description: `Please review your values and try again.`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
      })

  };

  return (
    <Box display="flex" gap={2}>
      <Text flex={1} lineHeight="32px" fontSize={fontSize}>
        {field}:
      </Text>
      {updateField ? (
        <>
          <Input
            value={valueState}
            flex={1}
            h="32px"
            onChange={onChange}
            type={field === "Password" ? "password" : "text"}
            borderColor={error ? 'crimson' : 'grey'}
          />
        </>
      ) : (
        <>
          <Text flex={1} lineHeight="32px" fontSize={fontSize}>
            {field === "Password" ? "********" : valueState}{" "}
          </Text>{" "}
        </>
      )}
      <IconButton
        aria-label="Edit Username"
        icon={updateField ? <CheckIcon /> : <EditIcon />}
        size="sm"
        onClick={updateField ? onClickCheck : onClickEdit}
      />
    </Box>
  );
};

export default UserDetailsRow;
