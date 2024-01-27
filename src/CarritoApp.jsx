import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import AppTheme from './theme/AppTheme';
import 'react-toastify/dist/ReactToastify.css';

function CarritoApp() {
  

  return (
    <Provider store={ store }>
        <BrowserRouter>
            <AppTheme>
                <ToastContainer />
                <AppRouter />
            </AppTheme>
        </BrowserRouter>
    </Provider>
  )
}

export default CarritoApp;
