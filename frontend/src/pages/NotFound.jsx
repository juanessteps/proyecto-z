import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GlitchText from '../components/GlitchText';

const NotFound = () => (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)',
        }}
    >
        <Container maxWidth="sm">
            <Typography variant="overline" sx={{ color: '#3d3030', letterSpacing: '0.4em', mb: 2, display: 'block' }}>
                Error 404
            </Typography>
            <GlitchText text="LOST IN THE FOG" component="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, display: 'block', mb: 2 }} />
            <Typography variant="body1" sx={{ color: '#8c7b68', mb: 4, fontStyle: 'italic', lineHeight: 1.8 }}>
                "You've wandered off the path. The fog has swallowed this page whole.
                Perhaps it never existed at all..."
            </Typography>
            <Button component={RouterLink} to="/" variant="contained" color="primary" size="large" sx={{ px: 5 }}>
                Return to Silent Hill
            </Button>
        </Container>
    </Box>
);

export default NotFound;
