import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import FogOverlay from '../components/FogOverlay';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShieldIcon from '@mui/icons-material/Shield';

const SECTIONS = [
    { label: 'Lore', icon: <MenuBookIcon sx={{ fontSize: 40, color: '#c0392b' }} />, path: '/lore', desc: 'Uncover the dark secrets of Toluca Lake.' },
    { label: 'Characters', icon: <PeopleIcon sx={{ fontSize: 40, color: '#c0392b' }} />, path: '/characters', desc: 'James, Maria, Angela, and the monsters within.' },
    { label: 'Items', icon: <InventoryIcon sx={{ fontSize: 40, color: '#c0392b' }} />, path: '/items', desc: 'Weapons, health items and key objects.' },
    { label: 'Guide', icon: <ShieldIcon sx={{ fontSize: 40, color: '#c0392b' }} />, path: '/tips', desc: 'Survive the fog with expert strategies.' },
];

const Home = () => (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <FogOverlay />

        {/* Hero Section */}
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 3,
                background: `
          radial-gradient(ellipse 100% 80% at 50% 0%, rgba(192,57,43,0.12) 0%, transparent 60%),
          linear-gradient(to bottom, #080808 0%, #0d0808 50%, #080808 100%)
        `,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://images.alphacoders.com/137/1375067.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.08,
                },
            }}
        >
            {/* Decorative line */}
            <Box sx={{ width: 60, height: 1, background: '#c0392b', mb: 4, boxShadow: '0 0 20px #c0392b' }} />

            <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.4em', mb: 2, display: 'block' }}>
                FAN PORTAL
            </Typography>

            <GlitchText
                text="SILENT HILL II"
                component="h1"
                sx={{
                    fontSize: { xs: '3rem', sm: '5rem', md: '7rem' },
                    fontWeight: 700,
                    color: '#d4c5b0',
                    lineHeight: 1,
                    mb: 2,
                    textShadow: '0 0 40px rgba(192,57,43,0.4)',
                }}
            />

            <Typography
                variant="h5"
                sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: '#8c7b68',
                    fontStyle: 'italic',
                    mb: 5,
                    maxWidth: 500,
                    letterSpacing: '0.08em',
                }}
            >
                "In my restless dreams, I see that town..."
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                    component={RouterLink} to="/lore"
                    variant="contained" color="primary" size="large"
                    sx={{ px: 4, py: 1.5 }}
                >
                    Explore the Lore
                </Button>
                <Button
                    component={RouterLink} to="/characters"
                    variant="outlined" color="primary" size="large"
                    sx={{ px: 4, py: 1.5, borderColor: '#2c2020', color: '#d4c5b0', '&:hover': { borderColor: '#c0392b' } }}
                >
                    Meet the Characters
                </Button>
            </Box>

            {/* Scroll hint */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    animation: 'bounce 2s ease-in-out infinite',
                    '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                        '50%': { transform: 'translateX(-50%) translateY(8px)' },
                    },
                }}
            >
                <Typography variant="caption" sx={{ color: '#3d3030', letterSpacing: '0.2em' }}>SCROLL</Typography>
                <Box sx={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #3d3030, transparent)' }} />
            </Box>
        </Box>

        {/* Sections Grid */}
        <Container maxWidth="lg" sx={{ py: 10, position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" align="center" sx={{ mb: 1, color: '#c0392b' }}>
                Enter the Fog
            </Typography>
            <Typography align="center" sx={{ color: '#8c7b68', mb: 6 }}>
                Everything you need to survive Toluca Lake
            </Typography>

            <Grid container spacing={3}>
                {SECTIONS.map(({ label, icon, path, desc }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Paper
                            component={RouterLink} to={path}
                            elevation={0}
                            sx={{
                                display: 'block',
                                textDecoration: 'none',
                                p: 4,
                                textAlign: 'center',
                                background: '#110f0f',
                                border: '1px solid #2c2020',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    border: '1px solid #c0392b',
                                    boxShadow: '0 0 30px rgba(192,57,43,0.2)',
                                    transform: 'translateY(-4px)',
                                    '& .section-label': { color: '#c0392b' },
                                },
                            }}
                        >
                            {icon}
                            <Typography className="section-label" variant="h6" sx={{ mt: 2, mb: 1, transition: 'color 0.3s', fontFamily: "'Cinzel'" }}>
                                {label}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#8c7b68' }}>
                                {desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Quote */}
            <Box sx={{ mt: 10, textAlign: 'center', borderTop: '1px solid #2c2020', pt: 6 }}>
                <Typography variant="h6" sx={{ color: '#3d3030', fontStyle: 'italic', fontFamily: "'Cinzel'" }}>
                    "There was a REAL monster in this town. Not the pyramid-head thing... not those mannequins..."
                </Typography>
                <Typography variant="caption" sx={{ color: '#2c2020', display: 'block', mt: 1, letterSpacing: '0.2em' }}>
                    — JAMES SUNDERLAND
                </Typography>
            </Box>
        </Container>
    </Box>
);

export default Home;
