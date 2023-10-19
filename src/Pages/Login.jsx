import {
  Box,
  Flex,
  Image,
  Input,
  FormLabel,
  Text,
  Button,
  InputRightElement,
  chakra,
  InputGroup,
  InputLeftElement,
  Toast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import loginImage from "../Images/login-bg.jpg";
import { FaUserAlt, FaLock } from "react-icons/fa";
import MyContext from "../Components/ContextApi/MyContext";
import axios from "axios";
import Cookies from "js-cookie";
import simpleteklogo from "../Images/simpleteklogo.svg";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


const Login = () => {
  const { globalState, setGlobalState, api_domain } = useContext(MyContext);

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    let email = user;
    let loginData = {
      email,
      password,
    };
  
    try {
      const response = await axios.post(`${api_domain}login/`, loginData);
  
      if (response.status === 200) {
        setMessage("Authentication successful");
        const username = response.data.username;
  
        // Show success toast
        toast({
          title: `Welcome back, ${username} !`,
          description: "Logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        Cookies.set("username", username, { expires: 7 });
        Cookies.set("authorized", response.data.message, { expires: 7 });
  
        navigate("/");
      } else if (response.status === 401) {
        // Show error toast for invalid credentials
        toast({
          title: "Authentication failed",
          description: "Invalid credentials. Please try again.",
          status: "error",
          duration: 7000,
          isClosable: true,
          
        });
      }
    } catch (error) {
      // Show error toast for other issues
      toast({
        title: "Authentication failed",
        description: "Invalid credentials. Please try again. If the issue persists, contact us.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  
  
  return (
    <Flex>
      <Box
        bgColor={"gray.100"}
        border={"0px solid red"}
        height={"100vh"}
        w={"100%"}
      >
        <Box w={"26%"} m={"auto"} mt={10} border={"0px solid black"}>
          <Image w={"100%"} src={simpleteklogo} />
        </Box>
        <Box
          borderRadius={"10px"}
          border={"1px solid #D3D3D3"}
          w={"60%"}
          m={"auto"}
          mt={"100px"}
          bgColor={"white"}
          p={6}
        >
          <FormLabel fontSize={27}>Admin Login</FormLabel>
          <FormLabel mt={4} fontSize={15} color={"grey"}>
            Registered Email*
          </FormLabel>
          <InputGroup>
            <Input
              placeholder="Ex: graham@yesenia.net"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt color="gray.300" />}
            />
          </InputGroup>

          <FormLabel mt={3} fontSize={15} color={"grey"}>
            Password*
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaLock color="gray.300" />}
            />
            <Input
              placeholder="******"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex
            mt={6}
            alignItems={"center"}
            justifyContent={"space-between"}
            border={"0px solid red"}
          >
            <Button bgColor={"#3259E4"} color={"white"} onClick={handleLogin}>
              Login
            </Button>
            <Text>Forgot Password?</Text>
            
          </Flex>
        </Box>
      </Box>
      <Box
        backgroundImage={loginImage}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        border={"0px solid red"}
        height={"100vh"}
        w={"100%"}
      >
        {/* <Image  w={"100%"} src={loginImage} /> */}
      </Box>
    </Flex>
  );
};

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [formData, setFormData] = useState({ user: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://3.218.73.237/client/login/', formData);

//       if (response.status === 200) {
//         setMessage('Authentication successful');
//       } else {
//         setMessage('Authentication failed');
//       }
//     } catch (error) {
//       setMessage('An error occurred');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} style={{background:'grey'}}>
//         <div>
//           <label htmlFor="user">User:</label>
//           <input
//             type="text"
//             id="user"
//             name="user"
//             value={formData.user}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default Login;
