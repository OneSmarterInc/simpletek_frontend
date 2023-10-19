import { useState } from "react"
import MyContext from "./MyContext";


//const api_domain = "http://3.218.73.237/api/v1/";
const api_domain = "http://127.0.0.1:8000/api/v1/";





const initialState = {
  client:[],
  carrier:[],
  archive:[],
  deletedBill:[],
  bills:[],
  isAuth:false
}

const MyProvider = ({children})=>{

  const [globalState, setGlobalState] = useState(initialState);

  return (
    <MyContext.Provider value = {{globalState, setGlobalState, api_domain}}>
      {children}
    </MyContext.Provider>

  )
}


export default MyProvider;