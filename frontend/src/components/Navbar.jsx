import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton,
    Drawer, List, ListItem, ListItemButton, ListItemText, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_LINKS = [
    { label: 'Maps', path: '/maps' },
    { label: 'Lore', path: '/lore' },
    { label: 'Characters', path: '/characters' },
    { label: 'Items', path: '/items' },
    { label: 'Guide', path: '/tips' },
];

const Navbar = () => {
    const [drawer, setDrawer] = useState(false);

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                    {/* Logo */}
                    <Typography
                        component={RouterLink} to="/"
                        variant="h5"
                        sx={{
                            textDecoration: 'none',
                            color: '#c0392b',
                            fontFamily: "'Cinzel', serif",
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            textShadow: '0 0 20px rgba(192,57,43,0.6)',
                            '&:hover': { color: '#e74c3c' },
                        }}
                    >
                        SILENT HILL II
                    </Typography>

                    {/* Desktop nav */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {NAV_LINKS.map(({ label, path }) => (
                            <Button key={label} component={RouterLink} to={path}
                                sx={{ color: '#d4c5b0', '&:hover': { color: '#c0392b' } }}>
                                {label}
                            </Button>
                        ))}
                    </Box>

                    {/* Mobile hamburger */}
                    <IconButton
                        sx={{ display: { md: 'none' }, color: '#d4c5b0' }}
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                anchor="right" open={drawer} onClose={() => setDrawer(false)}
                PaperProps={{ sx: { background: '#110f0f', border: '1px solid #2c2020', width: 240 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ color: '#c0392b', fontFamily: "'Cinzel'", mb: 2 }}>
                        SILENT HILL II
                    </Typography>
                    <Divider sx={{ borderColor: '#2c2020', mb: 1 }} />
                    <List dense>
                        {NAV_LINKS.map(({ label, path }) => (
                            <ListItem key={label} disablePadding>
                                <ListItemButton component={RouterLink} to={path} onClick={() => setDrawer(false)}>
                                    <ListItemText primary={label} sx={{ color: '#d4c5b0' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Toolbar />
        </>
    );
};

export default Navbar;
