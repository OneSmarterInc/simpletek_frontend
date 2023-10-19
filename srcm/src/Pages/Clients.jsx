import React, { useContext, useEffect } from 'react'

import ClientsTable from '../Components/ClientsTable'

import { Box,Flex,Img,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ClientsModal from '../Components/ClientsModal';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import home from "../Images/home.png";

export const Clients = () => {

  const {globalState, setGlobalState,api_domain} = useContext(MyContext);
 
 
  const fetchClient = async()=>{
    try {
       let data =  await axios.get(`${api_domain}allclients/`);
       setGlobalState({...globalState, client:data.data})
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchClient();
  },[])

  return (
    <>
     <NavBar/>
    
    <Box bg={'#f2f2f2'}>
      
        
        <Flex>
        <SideBar/>
            <Box w={'85%'} paddingTop={'30px'} marginLeft={'30px'}>

            <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Box>
                <Flex gap={'15px'} alignItems={'center'}>
              <Text fontSize={'30px'} fontWeight={'600'}>Add Clients</Text>
              {/* <Button bg={'#339900'} color={'white'} _hover={{'bg':'#194c00'}} borderRadius={'50px'} marginTop={'10px'} size={'sm'}> + Add Clients</Button>
               */}
                <ClientsModal/>
              </Flex>
              </Box>
              <Img w={'1.5%'} src={home} marginRight={'100px'}/>
            </Flex>
            </Box>
              <ClientsTable/>
            </Box>
        </Flex>
    </Box>
    </>
  )
}
