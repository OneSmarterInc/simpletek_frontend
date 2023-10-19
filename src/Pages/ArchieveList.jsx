import React, { useContext, useEffect } from 'react'
import { Box,Flex,Heading,Img,Select,Text,Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ArchiveTable from '../Components/ArchiveTable';
import { NavBar } from '../Components/NavBar';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import SideBar from '../Components/SideBar';
import home from "../Images/home.png"


export const ArchieveList = () => {

  const {globalState, setGlobalState} = useContext(MyContext);
 
 
  const fetchArchive = async()=>{
    try {
       let data =  await axios.get("http://localhost:3000/archive");
      // console.log(data);
      // console.log(data.data);
       setGlobalState({...globalState, archive:data.data})
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchArchive();
  },[])

  return (

    <>
    <NavBar/>
    

    <Box bg={'#f2f2f2'}>

        
        <Flex>
            <SideBar/>
            <Box w={"85%"}>
          
             

            <Box w={'100%'} paddingTop={'30px'} marginLeft={'30px'}>

            <Box pl={3}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Box >
                {/* <Flex gap={'15px'} alignItems={'center'}> */}
              <Text fontSize={'30px'} fontWeight={'600'}>Archive List</Text>
              {/* <Button bg={'#339900'} color={'white'} _hover={{'bg':'#339900'}} borderRadius={'50px'} marginTop={'10px'} fontSize={'15px'} size={'sm'}> + Add Carrier</Button> */}
              {/* </Flex> */}
              </Box>
              <Img w={'1.5%'} src={home} marginRight={'100px'}/>
            </Flex>
            </Box>

            </Box>
            <ArchiveTable/>
            </Box>
            
            
        </Flex>
    </Box>
    </>
  )
}
