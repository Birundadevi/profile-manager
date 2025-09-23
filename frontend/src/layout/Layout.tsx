import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
     onLogout: () => void;
}

// This is our main layout component that wraps all our pages.
const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
    // You can customize your theme here
    const theme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#f4f6f8', // A light grey for the background
                paper: '#ffffff', // White for the card-like elements
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Sidebar onLogout={onLogout} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: '100%', minHeight: '100vh', mt: 3, ml: '240px' }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;