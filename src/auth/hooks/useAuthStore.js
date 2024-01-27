import { useDispatch, useSelector } from "react-redux";
import { checkLogin, checkRegister, clearError, onLogin, onLogout } from "../../store/features/authSlice";
import { toast } from "react-toastify";
import carritoApi from "../../api/carritoApi";
import { useNavigate } from 'react-router-dom';

const useAuthStore = () => {
    const { status, user, errorMenssage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    //^ Expresión regular para validar un email

        return re.test(email);  //^ Devuelve true o false
    };


    /* const validateCokkies = () => {
        if (!document.cookie.includes('token')) { //^ Si no existe la cookie token,
            return false
        } else {
            return true;
        }
    }; */



    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await carritoApi.post("/user/register", { name, email, password },
            { withCredentials: true });

            toast.success( `Gracias por registrarte.` );
            navigate('/login');
            return data;
            
        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            dispatch( onLogout( errorMenssage ) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.
            toast.error(`Error de registro: ${ errorMenssage }`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };







    const startLogin = async ({ email, password }) => {
        dispatch( checkLogin() );
        
        try {
            const { data } = await carritoApi.post("/user/login", { email, password },
            { withCredentials: true });
        
            console.log( data.user );

            dispatch( onLogin({ name: data.user.name, uid: data.user._id, photo: data.user.photo, money: data.user.availableMoney }) );
            navigate('/shop');
            toast.success( `Bienvenido` );
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            dispatch( onLogout(errorMenssage) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.
            toast.error(`Error al iniciar sesión: ${errorMenssage}`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    




    const startGetUserById = async (uid) => {
        try {
            const { data } = await carritoApi.get(`/user/${ uid }`,
            { withCredentials: true });

            return data;

        } catch (error) {
            console.log(error);
        }
    };






    const startUpdateUser = async ( formData ) => {
        try {
            const { data } = await carritoApi.patch(`/user/updateuser`, formData,
            { withCredentials: true });

            toast.success('User updated successfully');
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';

            toast.error(`Error al actualizar los datos: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const startChangePassword = async ( formData ) => {
        try {
            const { data } = await carritoApi.patch(`/user/changepassword`, formData,
            { withCredentials: true });

            toast.success('Password changed successfully');
            return data;

        } catch (error) {
            console.log(error);
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            toast.error(`Error al actualizar los datos: ${errorMenssage}`);
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };







    const startLogout = async () => {

        try {
            await carritoApi.get("/user/logout",{ withCredentials: true });
            dispatch( onLogout() );
            navigate('/');
        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al cerrar sesión: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };



    const startContact = async (formData) => {
        try {
            await carritoApi.post("/contact", formData,
            { withCredentials: true });

            toast.success( `Gracias por contactarnos, te responderemos lo más pronto posible.` );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al enviar el mensaje: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };





    const forgotPassword = async (email) => {
            
            try {
                await carritoApi.post("/user/forgot-password", { email },
                { withCredentials: true });
    
                toast.success( `Se ha enviado un correo a ${ email } para restablecer tu contraseña.` );
    
            } catch (error) {
                const errorMenssage = error.response?.data.msg || 'Error inesperado';
                
                toast.error(`Error al restablecer la contraseña: ${errorMenssage}`);
                setTimeout(() => {
                    dispatch( clearError() );
                }, 100);
            }
    };




    const startResetPassword = async (token, password) => {

        try {
            await carritoApi.put(`/user/reset-password/${ token }`, { password },{ withCredentials: true });
            toast.success( `Tu contraseña ha sido restablecida.` );

        } catch (error) {
            const errorMenssage = error.response?.data.msg || 'Error inesperado';
            
            toast.error(`Error al restablecer la contraseña: ${errorMenssage}`);
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        }
    };




    return {

        //^ Propiedades
        status,
        user,
        errorMenssage,


        //^ Métodos
        startRegister,
        validateEmail,
        startLogout,
        startLogin,
        forgotPassword,
        startResetPassword,
        startUpdateUser,
        startGetUserById,
        startContact,
        startChangePassword,
        //validateCokkies,
        
    }
};

export default useAuthStore;