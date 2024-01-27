import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import useProductStore from "../hooks/useProductStore";
import { useEffect } from "react";

function Shop() {

    const { allProducts , startGetProducts, startAgregarAlCarrito } = useProductStore();
    
    useEffect(() => {
        const getProducts = async () => {
            await startGetProducts();
        };
        getProducts();
    }, []);


    const products = allProducts ? allProducts.products : [];


    const handleAddToCart = (product) => {
        startAgregarAlCarrito(product);
    };

    




    return (
        <div>
            <Grid container spacing={3} style={{ padding: "24px" }} >
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <CardActionArea component={RouterLink} to={`/product/${product.id}`}>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="140"
                                    image={product.image}
                                    title={product.name}
                                />
                                <CardContent>
                                    <Tooltip title={product.name} placement="top">
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.name}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight: "bold", fontSize: "1.2rem"}}>
                                        ${product.price} c/u
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Quantity: {product.quantity}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Button variant="contained" color="primary" onClick={ () => handleAddToCart(product) }>
                                Agregar al carrito
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="page-wrapper"></div>
        </div>
    );
}

export default Shop;