import React, { useContext, useEffect } from 'react'

import CarriersTable from '../Components/CarriersTable'


import { Box,Flex,Heading,Img,Select,Text,Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CarriersModal from '../Components/CarriersModal';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import home from "../Images/home.png";

export const Carriers = () => {

  const {globalState,setGlobalState,api_domain} = useContext(MyContext);


  const fetchCarrier = async()=>{
    try {
      let data = await axios.get(`${api_domain}allcarrier/`);
      //  console.log(data.data);     
      setGlobalState({...globalState, carrier:data.data})  
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCarrier();
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
              <Text fontSize={'30px'} fontWeight={'600'}>Carrier</Text>
              {/* <Button bg={'#339900'} color={'white'} _hover={{'bg':'#339900'}} borderRadius={'50px'} marginTop={'10px'} fontSize={'15px'} size={'sm'}> + Add Carrier</Button> */}
              <CarriersModal/>
              </Flex>

              </Box>
              <Img w={'1.5%'} src={home} marginRight={'100px'}/>
            </Flex>
            </Box>
          <CarriersTable/>

            </Box>
        </Flex>
    </Box>
    </>
  )
}
