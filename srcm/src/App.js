import axios from 'axios';
import './App.css';
import CarriersModal from './Components/CarriersModal';
import ClientsModal from './Components/ClientsModal';


import { NavBar } from './Components/NavBar';
import { MainRoutes } from './Pages/MainRoutes';
import { useContext, useEffect } from 'react';
import MyContext from './Components/ContextApi/MyContext';
import Login from './Pages/Login';


function App() {

  const {globalState, setGlobalState} = useContext(MyContext);

//   const fetchUpload = async()=>{
//     try {
//       let data =  await axios.get("http://localhost:3000/upload");
//       // data = await data.json();
//       console.log(data.data);
//       setGlobalState({...globalState, upload: data.data})
//     } catch (error) {
//       console.log(error);
//     }
//   }
// console.log(globalState);
//   useEffect(()=>{
//     fetchUpload();
//   },[])

  return (
    <div className="App">
      
      <MainRoutes />

    </div>
  );
}

export default App;
