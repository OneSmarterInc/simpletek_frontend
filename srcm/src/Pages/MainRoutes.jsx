import React from 'react'

import Login from './Login'

import { Routes,Route } from 'react-router-dom'
import { Home } from './Home';
import { ArchieveList } from './ArchieveList';
import { Clients } from './Clients';
import { Carriers } from './Carriers';
import { ChangePassword } from './ChangePassword';
import DeletedList from './DeletedList';
import { PrivateRoute } from '../Components/PrivateRoute';

export const MainRoutes = () => {
  return <Routes>
    <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}/>
     <Route path='/login' element={<Login/>} />
    <Route path='/clients' element={<PrivateRoute><Clients /></PrivateRoute>}/>
    <Route path='/carriers' element={<PrivateRoute><Carriers /></PrivateRoute>}/>
    <Route path='/archievelist' element={<PrivateRoute><ArchieveList /></PrivateRoute>}/>
    <Route path='/changepassword' element={<PrivateRoute><ChangePassword /></PrivateRoute>}/>
    <Route path='/deletedlist' element={<PrivateRoute><DeletedList/></PrivateRoute>} />
    <Route path='*' element={<h1>No Page Found</h1>} />
    </Routes>
}
