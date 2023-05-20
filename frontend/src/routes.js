import React from "react";
import Dashboard from "./views/Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function Routes(Gpath){
    return(
        <BrowserRouter>
        <Routes>     
            <Login/>
            <Route path="/dashboard" exact component={Dashboard}/>
         </Routes> 
         </BrowserRouter> 
    )
}