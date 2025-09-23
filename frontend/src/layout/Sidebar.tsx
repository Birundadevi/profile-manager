import React from 'react';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    AccountCircle,
    Dashboard,
    Logout,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';

// Define the component's props, including onLogout
interface SidebarProps {
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const location = useLocation();

    const menuItems = [
        { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar sx={{ justifyContent: 'center', p: 2 }}>
                <Typography variant="h6" noWrap>
                    Profile Management
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
            <Box sx={{ mt: 'auto' }}>
                <List>
                    <ListItemButton onClick={onLogout}>
                        <ListItemIcon><Logout /></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;