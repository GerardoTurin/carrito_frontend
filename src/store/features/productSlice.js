import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: null,
    errorMenssage: null,
    totalValue: 0,
    totalCategories: 0,
    totalLowStock: 0,
    totalProducts: 0,
    carrito: [],
    totalItems: 0,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        calcStoreValue: (state, { payload }) => {
            state.totalValue = payload.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        },
        calcTotalLowStock: (state, { payload }) => {
            state.totalLowStock = payload.products.filter((product) => product.quantity < 5).length;
        },
        calcTotalProducts: (state, { payload }) => {
            state.totalProducts = payload.products.length;
        },
        onActiveProduct: (state, { payload }) => {
            state.activeProduct = payload;
        },
        getProducts: (state, { payload }) => {
            state.allProducts = payload 
        },
        getProductById: (state, { payload }) => {
            state.allProducts = payload;
        },
        agregarAlCarrito: (state, { payload }) => {
            const productInCart = state.carrito.find(product => product._id === payload.id);

            if (productInCart) {
                productInCart.cantidad += 1;
            } else {
                state.carrito.push({ ...payload, cantidad: 1 });
            }
        },
        incrementarCantidad: (state, { payload }) => {
            // Busca el producto en el carrito
            const productInCart = state.carrito.find(product => product._id === payload.id);

            if (productInCart) {
                // Si el producto está en el carrito, incrementa su cantidad
                productInCart.cantidad += 1;
            }
        },
        decrementarCantidad: (state, { payload }) => {
            // Busca el producto en el carrito
            const productInCart = state.carrito.find(product => product._id === payload.id);

            if (productInCart && productInCart.cantidad > 1) {
                // Si el producto está en el carrito y su cantidad es mayor a 1, decrementa su cantidad
                productInCart.cantidad -= 1;
            } else if (productInCart && productInCart.cantidad === 1) {
                // Si el producto está en el carrito y su cantidad es 1, lo elimina del carrito
                state.carrito = state.carrito.filter(product => product.id !== payload.id);
            }
        },
        deleteProduct: (state, { payload }) => {
            state.carrito = state.carrito.filter((product) => product._id !== payload);
        },
        clearCarrito: (state) => {
            state.carrito = [];
        },
        getCarrito: (state, { payload }) => {
            state.carrito = payload;
        },
    },
});

export const {  
                getProducts, 
                getProductById,
                onActiveProduct,
                calcStoreValue, 
                calcTotalLowStock, 
                calcTotalProducts,
                agregarAlCarrito,
                incrementarCantidad,
                decrementarCantidad,
                deleteProduct,
                clearCarrito,
                getCarrito
                                } = productSlice.actions;