import { Avatar, Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import logowhite from "../Images/logowhite.svg";
import avatar from "../Images/user.png";
import Cookies from "js-cookie";

export const NavBar = () => {
  const username = Cookies.get("username");
  return (
    <Box>
      <Box pt={1} h={"11vh"} bg={"#3259e4"} maxHeight={"7rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box marginLeft={"40px"} w={"10%"} border={"0px solid black"}>
            <Link to={"/"}>
              <Img src={logowhite} w={"100%"} border={"1px soli red"} />
            </Link>
          </Box>
          <Box w={"auto"} alignItems={"center"} marginRight={"30px"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"15px"}
            >
              <Avatar src={avatar} />
              <Text color={"white"} fontSize={"1rem"}>
                {username}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
