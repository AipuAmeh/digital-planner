import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../pages/Signup";
import { useToast } from "@chakra-ui/react";
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

  const onChange = (e: any) => {
    setValueState(e.target.value);
  };

  const onClickEdit = () => {
    setUpdates(!updateField);
  };

  const onClickCheck = () => {
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
        console.log("RESPONSE:", response.data);
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
      <Text flex={1} lineHeight="32px">
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
          />
        </>
      ) : (
        <>
          <Text flex={1} lineHeight="32px">
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
