import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Grid, Card, CardContent, Chip, CircularProgress, Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getTips } from '../api';

const DIFF_CONFIG = {
    easy: { label: 'Easy', color: 'success', icon: <LockOpenIcon fontSize="small" /> },
    medium: { label: 'Medium', color: 'warning', icon: <WarningAmberIcon fontSize="small" /> },
    hard: { label: 'Hard', color: 'error', icon: <LockIcon fontSize="small" /> },
};

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getTips()
            .then(({ data }) => setTips(data))
            .catch(() => setError('Failed to load survival tips'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>Know Before You Enter</Typography>
                <Typography variant="h3" sx={{ color: '#d4c5b0', mt: 0.5 }}>Survival Guide</Typography>
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
                <Typography variant="body2" sx={{ color: '#8c7b68', mt: 2, fontStyle: 'italic' }}>
                    Collected from those who returned.
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={3}>
                {tips.map((tip) => {
                    const diff = DIFF_CONFIG[tip.difficulty] || DIFF_CONFIG.medium;
                    return (
                        <Grid item xs={12} md={6} key={tip.id}>
                            <Card
                                elevation={0}
                                sx={{ height: '100%', borderLeft: '3px solid', borderLeftColor: `${diff.color}.main` }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                        <Typography variant="h6" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0', fontSize: '1rem', flex: 1 }}>
                                            {tip.title}
                                        </Typography>
                                        <Chip
                                            icon={diff.icon}
                                            label={diff.label}
                                            size="small"
                                            color={diff.color}
                                            variant="outlined"
                                            sx={{ ml: 1, flexShrink: 0 }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#8c7b68', lineHeight: 1.8 }}>
                                        {tip.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Tips;
