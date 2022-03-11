
import React from 'react';
import Registration from './Log_Reg/Registration';
import {Routes, Route,  BrowserRouter} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Log_Reg/Login';
import UserHome from './User/UserHome';
import StateCovidCase from './User/StateCovidCase';
import SearchPOIs from './User/SearchPOIs';
import CheckIn from './User/CheckIn'
import ContactWithCovidCase from './User/ContactWithCovidCase';
import ProfileSettings from './User/ProfileSettings/ProfileSettings';
import EditProfile from './User/ProfileSettings/EditProfile';
import HistoryOfStateACovidCase from './User/ProfileSettings/HistoryOfStateACovidCase';
import HistoryOfVisits from './User/ProfileSettings/HistoryOfVisits';
import AdminHome from './Admin/AdminHome'
import ProtectedRoute from './Log_Reg/ProtectedRoute';
import AddNewPoi from './Admin/AddNewPoi'
import  Charts  from './Admin/Charts';



function App() {

  return (
   <BrowserRouter>
     <div className="App">
     <Routes>
        <Route  path="/" element={<Login/>} />
        <Route  path="/Registration" element={<Registration/>} />
        
        <Route  path="UserHome" element={ <ProtectedRoute><UserHome /></ProtectedRoute> } />
        <Route  path="SearchPOIs" element={ <ProtectedRoute><SearchPOIs /></ProtectedRoute> } />
        <Route  path="CheckIn" element={ <ProtectedRoute><CheckIn /></ProtectedRoute> } />
        <Route  path="StateCovidCase" element={ <ProtectedRoute><StateCovidCase /></ProtectedRoute> } />
        <Route  path="ContactWithCovidCase" element={ <ProtectedRoute><ContactWithCovidCase /></ProtectedRoute> } />
        <Route  path="ProfileSettings" element={ <ProtectedRoute><ProfileSettings /></ProtectedRoute> } />
        <Route  path="ProfileSettings/EditProfile" element={ <ProtectedRoute><EditProfile /></ProtectedRoute> } />
        <Route  path="ProfileSettings/HistoryOfStateACovidCase" element={ <ProtectedRoute><HistoryOfStateACovidCase /></ProtectedRoute> } />
        <Route  path="ProfileSettings/HistoryOfVisits" element={ <ProtectedRoute><HistoryOfVisits /></ProtectedRoute> } />
        
        <Route path="AdminHome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="AddNewPoi" element={<ProtectedRoute><AddNewPoi /></ProtectedRoute>} />
        <Route path="Charts" element={<ProtectedRoute><Charts /></ProtectedRoute>} />
        <Route  path="/Login" element={<Login/>} />
        <Route  path="*" element={<NotFound/>} />

     </Routes>
     </div>
  </BrowserRouter>
     
  );
}

export default App;
