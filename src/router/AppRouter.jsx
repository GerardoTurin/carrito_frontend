import { Box, LinearProgress, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../auth/pages/HomePage";
import RegisterPage from "../auth/pages/RegisterPage";
import LoginPage from "../auth/pages/LoginPage";
import LayoutPage from "../shop/pages/LayoutPage";
import useAuthStore from "../auth/hooks/useAuthStore";
import Carrito from "../shop/pages/Carrito";
import Checkout from "../shop/pages/Checkout";
import Shop from "../shop/pages/Shop";
import { useEffect } from "react";

const AppRouter = () => {
    const { startLogin ,status } = useAuthStore();

    /* useEffect(() => {
        const activeAccount = async () => {
            await startLogin();
        }

        activeAccount();
    }, []); */


    if (status === 'checking') {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
                <Typography variant="h6" align="center">
                    Chequeando tu cuenta...
                </Typography>
            </Box>
        );
    }


    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {
                status === 'no-registrado' && !document.cookie.includes('token') ? (
                    <>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/layout" element={<LayoutPage />} >
                            <Route path="shop" element={<Shop />} />
                            <Route path="carrito" element={<Carrito />} />
                            <Route path="checkout" element={<Checkout />} />
                        </Route>
                        <Route path="*" element={<Navigate to="layout/shop" />} />
                    </>
                )
            }
            
        </Routes>
    )
};

export default AppRouter;