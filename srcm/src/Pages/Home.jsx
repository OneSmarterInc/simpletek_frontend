import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Img,
  Select,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { NavBar } from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import MyContext from "../Components/ContextApi/MyContext";
import HomeTable from "../Components/HomeTable";
import './Home.css';
import home from "../Images/home.png"
import { Link } from "react-router-dom";

export const Home = () => {
  const [client, setClient] = useState("");
  const [carrier, setCarrier] = useState("");
  const [billCycle, setBillCycle] = useState("");
  const [file, setFile] = useState(null); // Use null instead of an empty string
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);

  
  const { globalState, setGlobalState,api_domain } = useContext(MyContext);


  const [selectedClient, setSelectedClient] = useState('');
  
    const fetchClient = async () => {
      try {
        const response = await axios.get(`${api_domain}allclients/`);
        // setGlobalState({ ...globalState, client: response.data });
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
  
    const fetchCarrier = async()=>{
      try {
        let data = await axios.get(`${api_domain}allcarrier/`);
        //  console.log(data.data);     
        setGlobalState({...globalState, carrier:data.data})  
        
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      fetchClient();
      fetchCarrier();
    }, []);
  
    const handleChangeClient = (e) => {
      setSelectedClient(e.target.value);
      setClient(e.target.value)
    };

    const handleFilterClient = (e)=>{
      setSelectedClient(e.target.value);
    }

    
  
    const filteredCarriers = globalState.carrier.filter(carrier => carrier.client === selectedClient);
  


  console.log("--------------------------------------------------");
  console.log(globalState.client);
  const fetchBills = async () => {
    try {
      const response = await axios.get(`${api_domain}processedfiles/`);
      setGlobalState((prevState) => ({ ...prevState, bills: response.data }));
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const handleFilter = () => {
    axios
      .get(
        `http://localhost:3000/bills?billCycle_gte=${startDate}&billCycle_lte=${endDate}`
      )
      .then((response) => {
        setFilter(response.data);
      })
      .catch((error) => {
        console.error("Error filtering bills:", error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
    
    const formData = new FormData();
    formData.append("client", client);
    formData.append("carrier", carrier);
    formData.append("billCycle", billCycle);
    formData.append("file", file);

    try {
      alert("Your file is being processed. Please wait...");
      await axios.post(`${api_domain}${carrier}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Origin": "http://3.218.73.237/",
        },
      });
      // After successful upload, fetch the updated list of bills

      setTimeout(() => {
        fetchBills();
      }, 1000);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <>
      <NavBar />
      <Box bg="#f2f2f2">
        <Flex>
          <SideBar />
          <Box w="85%" paddingTop="30px" marginLeft="30px">
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="30px" fontWeight="600">
                  Bills
                </Text>
             
                <Img
                  w="1.5%"
                  src={home}
                  marginRight="100px"
                />
              
              </Flex>
            </Box>
            <br />
            <Box h="13vh" bg="#D6EAF8" w="98%">
              <Flex alignItems="center" justifyContent="space-evenly">
                <Box paddingLeft="10px" paddingTop="5px" w={"15%"}>
                  <Text
                    textAlign="justify"
                    color="#3259e4"
                  >
                    Client *
                  </Text>

                  <select
                    placeholder="Select"
                    bg="white"
                    w="200px"
                    onChange={handleChangeClient}
                  >
                    <option value="">Select Client</option>
                    {data.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </Box>

                <Box
                  paddingLeft="10px"
                  paddingTop="5px"
                  w={'15%'}
                >
                  <Text textAlign="justify" color="#3259e4">
                    Carrier *
                  </Text>
                  <select
                    bg="white"
                    w="200px"
                    onChange={(e) => setCarrier(e.target.value)}
                  >
                    <option value="">Select Carrier</option>
                    {filteredCarriers.map((carrier, index) => (
                      <option key={index} value={carrier.name}>
                        {carrier.name}
                      </option>
                    ))}
                  </select>
                </Box>

                <Box paddingTop="5px">
                  <Text textAlign="justify" color="#3259e4">
                    Bill Cycle *
                  </Text>
                  <Input
                    type="date"
                    bg="white"
                    placeholder="End Date"
                    value={billCycle}
                    onChange={(e) => setBillCycle(e.target.value)}
                  />
                </Box>

                <Box paddingTop="5px">
                  <Text textAlign="justify" color="#3259e4">
                    Upload Bill Pdf
                  </Text>
                  <Input
                  pt={1}
                    type="file"
                    bg="white"
                    placeholder="End Date"
                    onChange={handleFileChange}
                  />
                </Box>

                <Box paddingTop="5px">
                  <Text textAlign="justify" color="#3259e4">
                    Upload
                  </Text>
                  <Button
                    onClick={handleUpload}
                    w="200px"
                    bg="#3259e4"
                    color="white"
                  >
                    Upload
                  </Button>
                </Box>
              </Flex>
            </Box>

            <Box h="13vh" w="98%" bg="white">
              <Flex alignItems="center" gap="10px">

              {/* <Box paddingLeft="10px" paddingTop="5px" w={"15%"}>
                  <Text
                    textAlign="justify"
                    color="#3259e4"
                  >
                    Filter by client name
                  </Text>

                  <select
                    placeholder="Select"
                    bg="white"
                    w="200px"
                    onChange={handleFilterClient}
                  >
                    <option value="">Select Client</option>
                    {data.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </Box> */}


                <Box paddingTop="13px" paddingLeft="20px">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Box>
                <Box paddingTop="13px">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Box>
                <Box paddingTop="13px">
                  <Button onClick={handleFilter} bg="#3259e4" color="white">
                    Filter Listing
                  </Button>
                </Box>
              </Flex>
            </Box>
            <HomeTable selectedClient={selectedClient}/>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
