import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {AuthContextProvider} from "./context/AuthContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

const App = () => (
    <QueryClientProvider client={client}>
        <AuthContextProvider>
            <Navbar/>
            <Outlet/>
        </AuthContextProvider>
    </QueryClientProvider>
);

export default App;
