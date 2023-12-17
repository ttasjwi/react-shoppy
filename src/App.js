import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {AuthContextProvider} from "./components/context/AuthContext";

const App = () => (
    <AuthContextProvider>
        <Navbar />
        <Outlet />
    </AuthContextProvider>
);

export default App;
