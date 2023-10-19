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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { NavBar } from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import MyContext from "../Components/ContextApi/MyContext";
import HomeTable from "../Components/HomeTable";
import "./Home.css";
import Cookies from "js-cookie";

export const Home = () => {
  const { globalState, setGlobalState, api_domain } = useContext(MyContext);

  const [client, setClient] = useState("");
  const [carrier, setCarrier] = useState("");
  const [billCycle, setBillCycle] = useState("");
  const [file, setFile] = useState(null); // Use null instead of an empty string

  const [data, setData] = useState([]);
  const [datafilter, setDatas] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClients, setSelectedClients] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const username = Cookies.get("username");
  const toast = useToast();

  const fetchClient = async () => {
    try {
      const response = await axios.get(`${api_domain}allclients/`);
      // setGlobalState({ ...globalState, client: response.data });
      setData(response.data);
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarrier = async () => {
    try {
      let data = await axios.get(`${api_domain}allcarrier/`);
      //  console.log(data.data);
      setGlobalState({ ...globalState, carrier: data.data });
    } catch (error) {
      console.log(error);
      toast({
        title: "Upload failed.",
        description: "An error occurred while uploading the file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchClient();
    fetchCarrier();
  }, []);

  const handleChangeClient = (e) => {
    setClient(e.target.value);
    setSelectedClients(e.target.value);
  };

  const handleFilterClient = (e) => {
    setSelectedClient(e.target.value);
  };

  const filteredCarriers = globalState.carrier.filter(
    (carrier) => carrier.client === selectedClients
  );

  const fetchBills = async () => {
    try {
      const response = await axios.get(`${api_domain}processedfiles/`);
      setGlobalState((prevState) => ({ ...prevState, bills: response.data }));
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const handleFilter = () => {};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async () => {
  
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
  
    setIsUploading(true);
  
    // Helper function to format the current date and time
    const getFormattedDateAndTime = () => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      const formattedTime = `${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}-${currentDate.getMilliseconds()}`;
  
      return { formattedDate, formattedTime };
    };
  
    const { formattedDate, formattedTime } = getFormattedDateAndTime();
  
    // Rename the File
    const newFileName = `${client}_${carrier}_(billCycle_${billCycle})_(excel_genration_date_${formattedDate}_${formattedTime}).pdf`;
    const files = new File([file], newFileName, { type: file.type });
  
    const formData = new FormData();
    formData.append("client", client);
    formData.append("carrier", carrier);
    formData.append("billCycle", billCycle);
    formData.append("file", files);
    formData.append("username", username);
  
    try {
      await axios.post(`${api_domain}uploadfile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Origin: "http://3.218.73.237/client/",
        },
      });
  
      // Resetting form values after a successful upload
      setClient("");
      setCarrier("");
      setBillCycle("");
      setFile(null);
  
      // Displaying a success toast message
      toast({
        title: "Uploaded successfully.",
        description: "The file is queued for processing. You will receive an email after the files are successfully generated.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
  
      // Fetching the updated list of bills
      setTimeout(() => {
        fetchBills();
        setIsUploading(false);
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
          <Box w="85%" pt="30px" ml="30px">
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="30px" fontWeight="600">
                  Bills
                </Text>
              </Flex>
            </Box>
            <br />
            <Box
              h="13vh"
              bg="#D6EAF8"
              w="98%"
              maxHeight={"5rem"}
              boxShadow={"1px 1px 10px #68686863"}
              borderTopRadius={"10px"}
            >
              <Flex alignItems="center" justifyContent="space-evenly">
                <Box pl="10px" pt="5px" w={"15%"}>
                  <Text textAlign="justify" color="#3259e4">
                    Client *
                  </Text>

                  <select
                    placeholder="Select"
                    bg="white"
                    style={{ background: "white" }}
                    w="1rem"
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

                <Box paddingLeft="10px" paddingTop="5px" w={"15%"}>
                  <Text textAlign="justify" color="#3259e4">
                    Carrier *
                  </Text>
                  <select
                    style={{ background: "white", minWidth: "1rem" }}
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
                    style={{ background: "white", minWidth: "1rem" }}
                    onChange={(e) => setBillCycle(e.target.value)}
                  />
                </Box>

                <Box paddingTop="5px">
                  <Text textAlign="justify" color="#3259e4">
                    Upload Bill Pdf
                  </Text>
                  <Input
                    pt={1}
                    style={{ background: "white", minWidth: "1rem" }}
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
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading File..." : "Upload"}
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Flex justifyContent="flex-end" w="98%">
              <Text align={"right"} color={"red"} padding="5px">
                Please note: processing large files(greater than 1MB) can take
                between 20 minutes to 1 hours. Check back after uploading
              </Text>
            </Flex>
            <Box
              h="10vh"
              w="98%"
              bg="white"
              maxHeight={"5rem"}
              boxShadow={"1px 1px 10px #68686863"}
              borderBottomRadius={"10px"}
            >
              <Flex alignItems="center" gap="10px">
                <Box
                  paddingLeft="1px"
                  padding="1px"
                  w={"15%"}
                  border={"1px solid #68686863"}
                  borderRadius={"5px"}
                  marginLeft={"1.8rem"}
                  marginTop={"10px"}
                >
                  <select
                    placeholder="Select"
                    bg="white"
                    w="200px"
                    onChange={handleFilterClient}
                    style={{ background: "white" }}
                    border={"1px solid"}
                  >
                    <option value="">All Clients</option>
                    {datafilter.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </Box>

                <Box paddingTop="13px">
                  <Button onClick={handleFilter} bg="#3259e4" color="white">
                    Filter Listing
                  </Button>
                </Box>
              </Flex>
            </Box>
            <HomeTable selectedClient={selectedClient} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
