import { Button, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MyContext from "./ContextApi/MyContext";

function CarriersModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {globalState, setGlobalState, api_domain} = useContext(MyContext);
    const [carrierName,setCarrierName] = useState("");
    const [clientName,setClientName] = useState("")
    const [clientData,setClientData] = useState([]);

   



  const fetchClient = async()=>{
    try {
       let data =  await axios.get(`${api_domain}allclients/`);
       //setGlobalState({...globalState, client:data.data})
       setClientData(data.data)
       
    } catch (error) {
      console.log(error);
    }
  }

    const fetchCarrier = async()=>{
      try {
        let data = await axios.get(`${api_domain}allcarrier/`);
        //  console.log(data.data);     
        setGlobalState({...globalState, carrier:data.data})  
        
      } catch (error) {
        console.log(error);
      }
    }
   

      
 

    const postCarrier = async()=>{
      let carrierData = {
        name : carrierName,
        client : clientName
      }
       //console.log(carrierData);
      try {
        await axios.post(`${api_domain}allcarrier/`,carrierData)
        .then(()=>{
          fetchCarrier();
        })
        setCarrierName("");
        setClientName("");
        onClose();
        
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(()=>{
      fetchClient();
    },[])
  
    return (
      <>
        <Button bg={'#339900'} color={'white'} _hover={{'bg':'#194c00'}} borderRadius={'50px'} marginTop={'10px'} size={'sm'} onClick={onOpen} > + Add Carrier</Button>
  
  <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
    <ModalOverlay  />
    <ModalContent bgColor={"#cccccc"}>
      <ModalHeader>Add Carrier</ModalHeader>
      <ModalCloseButton />
      <ModalBody>


        <InputGroup >

        <Input bgColor={"white"} placeholder="Enter Carrier Name"  value={carrierName} onChange={(e)=>setCarrierName(e.target.value)}/>
        </InputGroup>
        <Select placeholder='Select Client' onChange={(e)=>setClientName(e.target.value)}>
      { clientData.length > 0 && clientData.map((el)=>{
        return (
          <option value={el.name} key={el.id}>{el.name}</option>
        )
      })}
            
        </Select>
      </ModalBody>

      <ModalFooter>
        <Button color={"white"} bgColor='#3259E4' onClick={postCarrier}>
          Add Carrier
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
      </>
    )
  }

  export default CarriersModal;