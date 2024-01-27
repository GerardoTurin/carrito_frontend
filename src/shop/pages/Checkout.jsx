import { Box, Button, Typography } from "@mui/material";
import useProductStore from "../hooks/useProductStore";
import useAuthStore from "../../auth/hooks/useAuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { carrito, startClearCarrito } = useProductStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    console.log(user);
    console.log(carrito);



    // Cantidad total de productos en el carrito
    const totalItems = carrito.reduce((total, product) => total + product.cantidad, 0);

    // Precio total de todos los productos en el carrito
    const totalAmount = carrito.reduce((total, product) => total + product.price * product.cantidad, 0);
    console.log(totalAmount);



    const handleCheckout = () => {
        if ( totalAmount > user.money ) {
            toast.error('No tenes suficiente dinero');
            return;
        }

        toast.success('Compra realizada con exito');
        startClearCarrito();
        navigate('/shop');
    };



    return (
        <>
            <Typography variant="h1" component="h2" align="center">
                Checkout
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px' }}>
                {
                    carrito?.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h4">Tus Productos</Typography>
                            {carrito.map((product, index) => (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', border: '1px solid black', padding: '10px', marginTop: '10px' }}>
                                    <Typography variant="h6">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        ${product.price} c/u
                                    </Typography>
                                    <Typography variant="h6">
                                        {product.cantidad} - cantidad
                                    </Typography>
                                    <Typography variant="h6">
                                        Total: ${product.price * product.cantidad}
                                    </Typography>
                                </Box>
                            ))}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                                <Typography variant="h4">
                                    Cantidad Total
                                </Typography>
                                <Typography variant="h4">
                                    {totalItems}    
                                </Typography>
                                <Typography variant="h4">
                                    Precio Final
                                </Typography>
                                <Typography variant="h4">
                                    $ {totalAmount}
                                </Typography>
                            </Box>

                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ marginTop: '50px' }}
                                onClick={handleCheckout}
                                >
                                Finalizar Compra
                            </Button>
                        </Box>
                    )
                    
                    
                }
            </Box>
        </>
            
    )
};

export default Checkout;