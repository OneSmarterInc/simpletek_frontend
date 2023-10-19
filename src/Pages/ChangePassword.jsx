import React from 'react'
import { Box,Flex,Heading,Img,Select,Text,Input, Button, InputGroup, InputRightElement,InputLeftElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import home from "../Images/home.png"
import axios from 'axios';

import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/SideBar';

// import "./ChangePassword.css"

export const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setconfirmPassword] = useState("");
  const [message,setMessage] = useState('');

  const handleChangePassword = async()=>{
    let passwordData = {
      oldPassword,
      newPassword
    }

    try {
      if(oldPassword == "" || newPassword == "" || confirmPassword == ""){
        setMessage("Please fill all the fields")
      }
      else{
        await axios.post("",passwordData)

        // if(response.ok){
        //   setMessage('Password changed successfully');
        // }
        // else{
        //   setMessage("Password change failed, Please check your old password");
        // }
      }
      
      
    } catch (error) {
      console.log("Error changing password",error);
      
    }
  }

  return (
    <>
    <NavBar/>
    <Box bg={'#f2f2f2'}>
        
        <Flex>
        <SideBar/>
            <Box w={'85%'} paddingTop={'30px'} marginLeft={'30px'}>

            <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize={'30px'} fontWeight={'600'}>Change Password</Text>
              <Img w={'1.5%'} src={home} marginRight={'100px'}/>
            </Flex>
            </Box>

          <Box w={'40%'} h={'40vh'} margin={'auto'} marginTop={'130px'} className='password-container'>
            
          <InputGroup>
                <Input type={showOldPassword ? 'text' : 'password'}  placeholder='Old password' border={'0.1px solid grey'} value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required/>
                <InputLeftElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowOldPassword((showOldPassword) => !showOldPassword)}>
                    {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputLeftElement>
              </InputGroup>

              <InputGroup mt={3}>
                <Input type={showNewPassword ? 'text' : 'password'}  placeholder='New Password' border={'0.1px solid grey'} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
                <InputLeftElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowNewPassword((showNewPassword) => !showNewPassword)}>
                    {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputLeftElement>
              </InputGroup>

              <InputGroup mt={3}>
                <Input type={showConfirmPassword ? 'text' : 'password'}  placeholder='Confirm Password' border={'0.1px solid grey'} value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)} required/>
                <InputLeftElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}>
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputLeftElement>
              </InputGroup>
              <Button bg={'#3259e4'} color={'white'} w={'100%'} marginTop={'20px'} onClick={handleChangePassword}>CHANGE PASSWORD</Button>
              <Text>{message}</Text>
          </Box>

          </Box>
        </Flex>
    </Box>
    </>
  )
}
