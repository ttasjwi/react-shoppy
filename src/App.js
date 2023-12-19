import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {AuthContextProvider} from "./components/context/AuthContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

const App = () => (
    <AuthContextProvider>
        <Navbar/>
        <QueryClientProvider client={client}>
            <Outlet/>
        </QueryClientProvider>
    </AuthContextProvider>
);

export default App;
