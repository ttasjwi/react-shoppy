import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom/dist/react-router-dom.development";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import RegisterProduct from "./pages/RegisterProduct";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, path: '/', element: <Home/>},
            {path: '/products', element: <AllProducts/>},
            {
                path: '/products/register',
                element: (
                    <ProtectedRoute requireAdmin={true}>
                        <RegisterProduct/>
                    </ProtectedRoute>
                )
            },
            {path: '/products/:productId', element: <ProductDetail/>},
            {
                path: '/my-cart',
                element: (
                    <ProtectedRoute>
                        <MyCart/>
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
