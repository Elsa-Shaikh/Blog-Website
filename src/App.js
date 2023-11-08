import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./components/accounts/Login";
import DataProvider from "./context/DataProvider";
import Header from "./components/Header";
import { useState } from "react";
import CreatePost from "./components/CreatePost";
import BlogView from "./components/BlogView";

const PrivateRoute = ({isAuthenticated,...props})=>{
  return isAuthenticated ?
  <>
  <Header/>
  <Outlet />
  </>
  :
  <Navigate replace to='/login' />
}


function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <>
      <DataProvider>
       <BrowserRouter>
       <Routes>
        <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
        <Route path='/' element={<Home />}/>
        </Route>        

        <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
        <Route path='/create' element={<CreatePost/>}/>
        </Route>        

        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
        <Route path='/details/:id' element={<BlogView/>}/>
        </Route>        
        
        </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
