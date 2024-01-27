import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box } from "@mui/material";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import heroImg from "../../assets/carrito-compra.jpg";
//import NumberText from "../components/NumberText";
import useAuthStore from "../hooks/useAuthStore";

const HomePage = () => {

    const { status  } = useAuthStore();

    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', height: "100vh" }}>
            <AppBar position="static" elevation={0}>
                <Toolbar style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <LogoDevIcon />
                    <Typography variant="h6" style={{ flex: 1 }}>
                        Carrito de Compras
                    </Typography>
                    {
                        status === 'autenticado' 
                            ? (
                                <Button variant="contained" color="info" component={ Link } to="/layout/dashboard">
                                    Dashboard
                                </Button>
                            ) : (
                                <Box sx={{ display: "flex", gap: "1rem" }}>
                                    <Button variant="contained" color="info" component={ Link } to="/register">
                                        Registro
                                    </Button>
                                    <Button variant="outlined" color="secondary" component={ Link } to="/login">
                                        Login
                                    </Button>
                                </Box>
                            ) 
                    }
                </Toolbar>
            </AppBar>
            {/* HERO SECTION */}
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Box elevation={3} className="hero-text" sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                            <Typography variant="h4" gutterBottom>
                                CarritoApp
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Proyecto de carrito de compras, para prueba de tecnologías.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ position: "relative", borderRadius: "1rem" }}>
                        <img src={heroImg} alt="Inventory" width="100%" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
