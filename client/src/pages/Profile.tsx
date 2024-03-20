
import { useLoaderData } from "react-router-dom";
import { Box,  Center, Flex, HStack, Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { CheckIcon, EditIcon} from '@chakra-ui/icons'




const Profile = () => {
  const data: any = useLoaderData();
  const [verse, setVerse] = useState('');
  const [show, setShowState] = useState(false);

console.log('LOADER DATA:',data);

  const options = {
    method: 'GET',
    url: 'https://labs.bible.org/api/?',
    params: {
      passage: 'votd',
      formatting: 'plain'
    },
    origin: true
  };

  const handleNewEditClick = () => {
    setShowState(true);
  }
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
  // truncate Bible verse and show more upon click
  // add media queries
  return (
    <Box>
      <Center display='flex' flexDirection='column'>
        <Text mt='3em' fontSize='3xl'>My Profile</Text>
        <Text fontSize='2xl' p='3em' className="verse" noOfLines={[1, 2, 3]}>{verse}</Text>
        <Flex flexDirection='column' border='solid #371236 2px' boxShadow='md'  p='2em'>
        <HStack spacing='50px' >
          <Text p='4' fontSize='20px'>Username:</Text>
          {
            show ?
          <>
               <Input></Input>
      <CheckIcon />

          </>
      : <>
               <Text fontSize='20px' p='4'>{data.username}</Text>
          <EditIcon 
             boxSize={5}
             color='#371236'
             onClick={handleNewEditClick}
             cursor='pointer'
          /> 
      </>
          }
        </HStack>
        <HStack spacing='50px'  >
          <Text p='4' fontSize='20px'>Email:</Text>
          <Text fontSize='20' p='4'>{data.email}</Text>
          <EditIcon 
             boxSize={5}
             color='#371236'
          />
        </HStack>
        <HStack spacing='50px'  >
          <Text p='4' fontSize='20px'>Password:</Text>
          <Text fontSize='20' p='4'>******</Text>
          <EditIcon
             boxSize={5}
             color='#371236'
           />
        </HStack>
        </Flex>
      </Center>

    </Box>

  )
}


export default Profile;