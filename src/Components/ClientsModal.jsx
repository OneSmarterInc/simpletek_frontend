import { Button, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MyContext from "./ContextApi/MyContext";



function ClientsModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {globalState, setGlobalState,api_domain} = useContext(MyContext);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    
  const fetchClient = async()=>{
    try {
       let data =  await axios.get(`${api_domain}allclients/`);
       setGlobalState({...globalState, client:data.data})
    } catch (error) {
      console.log(error);
    }
  }

    const postClient = async()=>{
      let clientData = {
          name,
          email
      }
      // console.log(clientData);
      try {
        await axios.post(`${api_domain}allclients/`,clientData)
        .then(()=>{
          fetchClient();
        })
        setName("");
        setEmail("");
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  
    
    return (
      <>
        <Button bg={'#339900'} color={'white'} _hover={{'bg':'#194c00'}} borderRadius={'50px'} marginTop={'10px'} size={'sm'} onClick={onOpen}> + Add Client</Button>
  
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
          <ModalOverlay  />
          <ModalContent bgColor={"#cccccc"}>
            <ModalHeader>Add Clients</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup >
              <FormLabel>Name*</FormLabel>
              <Input bgColor={"white"} placeholder="Ex: Seldin" value={name} onChange={(e)=>setName(e.target.value)} />
              </InputGroup>

              <InputGroup mt={4}>
              <FormLabel>Email</FormLabel>
              <Input w={"90%"} ml={3}  bgColor={"white"} placeholder="Ex: nathan@yesenia.net" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </InputGroup>
              
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={postClient} colorScheme='blue'>
                Add Client
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ClientsModal;