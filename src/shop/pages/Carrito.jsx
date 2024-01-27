import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SumaryCard";
import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useProductStore from "../hooks/useProductStore";

const Carrito = () => {
    //const carrito = useSelector((state) => state.product.carrito);
    const { carrito, startIncrementarCantidad, startDecrementarCantidad, startDeleteProduct, startClearCarrito } = useProductStore();
    //const [cantidad, setCantidad] = useState(1);
    console.log(carrito);




    // contar cantidad de productos unicos en el carrito
    const totalItems = carrito.reduce((total, product) => total + product.cantidad, 0); 
    console.log(totalItems);


    // sumar el precio de todos los productos en el carrito
    const totalAmount = carrito.reduce((total, product) => total + product.price * product.cantidad, 0);
    console.log(totalAmount);



    const incrementProduct = (productId) => {
       // Busca el producto en el carrito
        const product = carrito.find(product => product._id === productId);

        if (product && product.cantidad < product.quantity) {
            startIncrementarCantidad(productId);
        }
    };

    const decrementProduct = (productId) => {
        // Busca el producto en el carrito
        const product = carrito.find(product => product._id === productId);

        if (product && product.cantidad > 1) {
            startDecrementarCantidad(productId);
        }
    };


    const deleteProduct = (id) => {
        startDeleteProduct(id);
    };


    const clearCarrito = () => {
        startClearCarrito();
    };




    return (
        <div>
            <SummaryCard items={totalItems} amount={totalAmount} />
            {carrito?.length > 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px' }}>
                    <Typography variant="h3">Tus Productos</Typography>
                    <Button
                        variant="contained"
                        color="danger"
                        style={{ color: 'white' }}
                        onClick={ clearCarrito }
                    >
                        Limpiar Carrito
                    </Button>
                </Box>
            )
            : (
                <Typography variant="h3" align="center" sx={{ marginTop: '50px' }}>
                    No hay productos en el carrito
                </Typography>
            )}

            <Grid container spacing={3}>
                {carrito.map((product, index) => {
                    let id = product._id;
                    let name = product.name;
                    let imageUrl = product.image;
                    let price = product.price;
                    let quantity = product.quantity;

                    return (
                        <Grid item xs={12} key={index}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems:'center', maxWidth: '50%', margin: 'auto' }}>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="150"
                                    image={product.image}
                                    title={product.name}
                                    />
                                <CardContent>
                                    <Typography variant="h5">
                                        {name}
                                    </Typography>
                                    <Typography variant="h6">
                                        ${price} c/u
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', padding: '10px' }}>
                                    <Box >
                                        <Typography variant="body1">
                                            Cantidad
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={() => decrementProduct(id)}>
                                                -
                                            </Button>
                                            <TextField
                                                readOnly
                                                type="text"
                                                value={product.cantidad}
                                                sx={{ width: '50px' }}
                                            />
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={() => incrementProduct(id)}>
                                                +
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="danger"
                                        sx={{ color: 'white' }}
                                        onClick={() => deleteProduct(id)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Carrito;