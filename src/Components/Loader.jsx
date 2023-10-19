import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center height="50vh">
      <Spinner size="xl" color="teal.500" thickness="4px" />
    </Center>
  );
};

export default Loader;
