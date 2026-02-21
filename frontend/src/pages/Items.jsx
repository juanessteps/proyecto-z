import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Grid, Card, CardContent, Chip,
    ToggleButton, ToggleButtonGroup, CircularProgress, Alert
} from '@mui/material';
import { getItems } from '../api';

const TYPE_COLORS = {
    weapon: 'error',
    health: 'success',
    key: 'warning',
    ammo: 'info',
    other: 'default',
};

const TYPE_LABELS = {
    weapon: '⚔️ Weapon',
    health: '❤️ Health',
    key: '🔑 Key Item',
    ammo: '🔫 Ammo',
    other: '📦 Other',
};

const Items = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getItems()
            .then(({ data }) => setItems(data))
            .catch(() => setError('Failed to load items'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

    if (loading) return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>Inventory</Typography>
                <Typography variant="h3" sx={{ color: '#d4c5b0', mt: 0.5 }}>Items & Weapons</Typography>
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Filter */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, flexWrap: 'wrap', gap: 1 }}>
                <ToggleButtonGroup
                    value={filter} exclusive
                    onChange={(_, v) => v && setFilter(v)}
                    sx={{
                        '& .MuiToggleButton-root': {
                            border: '1px solid #2c2020',
                            color: '#8c7b68',
                            borderRadius: 0,
                            fontFamily: "'Rajdhani'",
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            '&.Mui-selected': { background: 'rgba(192,57,43,0.15)', color: '#c0392b', borderColor: '#c0392b' },
                            '&:hover': { background: 'rgba(192,57,43,0.08)' },
                        }
                    }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    {Object.entries(TYPE_LABELS).map(([type, label]) => (
                        <ToggleButton key={type} value={type}>{label}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            <Grid container spacing={2}>
                {filtered.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card elevation={0} sx={{ height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0', fontSize: '0.95rem' }}>
                                        {item.name}
                                    </Typography>
                                    <Chip
                                        label={item.type.toUpperCase()}
                                        size="small"
                                        color={TYPE_COLORS[item.type] || 'default'}
                                        variant="outlined"
                                        sx={{ ml: 1, flexShrink: 0 }}
                                    />
                                </Box>
                                <Typography variant="body2" sx={{ color: '#8c7b68', lineHeight: 1.7 }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {filtered.length === 0 && !loading && (
                    <Grid item xs={12}>
                        <Typography align="center" sx={{ color: '#3d3030', py: 8 }}>
                            No items found for this category.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Items;
