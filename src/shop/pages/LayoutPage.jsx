import React from 'react'
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Copyright from '../../auth/components/Copyright';

const LayoutPage = () => {
    return (
        <Box>
            <NavBar />
            <Box sx={{ marginTop: '100px', marginBottom: '100px' }}>
                <Outlet />
            </Box>
            <Box sx={{bottom: 10, width: '100%' }}>
                <Copyright />
            </Box>
        </Box>
    )
};

export default LayoutPage;