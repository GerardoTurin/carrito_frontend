import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import carritoApi from "../../api/carritoApi";
import { 
        getProducts, 
        getProductById,
        calcStoreValue, 
        calcTotalLowStock, 
        calcTotalProducts,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        deleteProduct,
        clearCarrito,
        getCarrito
                            } from "../../store/features/productSlice";

const useProductStore = () => {
    const { 
            allProducts, 
            totalValue, 
            totalLowStock, 
            totalProducts, 
            errorMenssage,
            carrito,
                            } = useSelector(state => state.product);
    const dispatch = useDispatch();


    const startAgregarAlCarrito = (product) => {
        dispatch( agregarAlCarrito(product) );
        toast.success(`Se agrego ${product.name} al carrito`);
    };





    const startIncrementarCantidad = (id) => {
        dispatch( incrementarCantidad({ id }) );
    };



    const startDecrementarCantidad = (id) => {
        dispatch( decrementarCantidad({id}) );
    };



    const startDeleteProduct = ( id ) => {
        dispatch( deleteProduct(id) );
        toast.success(`Producto eliminado con exito`);
    };



    const startClearCarrito = () => {
        dispatch( clearCarrito() );
    };




    const startGetCarrito = () => {
        dispatch( getCarrito() );
    }






    const startGetProducts = async () => {
        try {
            const { data } = await carritoApi.get("/product",
            { withCredentials: true });


            dispatch( getProducts(data) );
            dispatch( calcStoreValue(data) );
            dispatch( calcTotalLowStock(data) );
            dispatch( calcTotalProducts(data) );

            return data;
        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al obtener los productos: ${errorMenssage}`)
        }
    };






    const startGetProductById = async ( id ) => {
        try {
            const { data } = await carritoApi.get(`/product/${id}`,
            { withCredentials: true });
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al obtener el producto: ${errorMenssage}`)
        }
    };




    return {
        allProducts,
        totalValue,
        totalLowStock,
        totalProducts,
        errorMenssage,
        carrito,
        getCarrito,



        //^ Actions
        startGetProducts,
        startGetProductById,
        startAgregarAlCarrito,
        startIncrementarCantidad,
        startDecrementarCantidad,
        startDeleteProduct,
        startClearCarrito,
        startGetCarrito
    }
}

export default useProductStore;