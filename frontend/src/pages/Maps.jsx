import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Grid, Card, CardContent, CardMedia,
    Chip, Dialog, DialogTitle, DialogContent, IconButton,
    CircularProgress, Alert, Divider, Stepper, Step, StepLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getMaps, proxyImg } from '../api';

const Maps = () => {
    const [maps, setMaps] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getMaps()
            .then(({ data }) => setMaps(data))
            .catch(() => setError('Failed to load maps'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>
                    Toluca Lake — 2003
                </Typography>
                <Typography variant="h3" sx={{ color: '#d4c5b0', mt: 0.5 }}>
                    Maps & Locations
                </Typography>
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
                <Typography variant="body2" sx={{ color: '#8c7b68', mt: 2, fontStyle: 'italic' }}>
                    Every path James walked. Every horror he encountered. In order.
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Journey timeline stepper */}
            {maps.length > 0 && (
                <Box sx={{ mb: 8, overflowX: 'auto' }}>
                    <Stepper
                        alternativeLabel
                        sx={{
                            minWidth: maps.length * 130,
                            '& .MuiStepLabel-label': { color: '#8c7b68', fontFamily: "'Rajdhani'", fontSize: '0.7rem', letterSpacing: '0.05em' },
                            '& .MuiStepConnector-line': { borderColor: '#2c2020' },
                            '& .Mui-active .MuiStepLabel-label': { color: '#c0392b' },
                            '& .Mui-completed .MuiStepLabel-label': { color: '#8c7b68' },
                        }}
                    >
                        {maps.map((m, i) => (
                            <Step key={m.id} active={selected?.id === m.id} completed={selected && i < maps.indexOf(selected)}>
                                <StepLabel
                                    onClick={() => setSelected(m)}
                                    sx={{ cursor: 'pointer', '&:hover .MuiStepLabel-label': { color: '#c0392b' } }}
                                    StepIconProps={{
                                        sx: {
                                            color: selected?.id === m.id ? '#c0392b !important' : '#2c2020 !important',
                                            '&.Mui-active': { color: '#c0392b !important' },
                                        }
                                    }}
                                >
                                    {m.name}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            )}

            {/* Location cards grid */}
            <Grid container spacing={3}>
                {maps.map((map, index) => (
                    <Grid item xs={12} sm={6} md={4} key={map.id}>
                        <Card
                            elevation={0}
                            onClick={() => setSelected(map)}
                            sx={{
                                cursor: 'pointer',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover .map-overlay': { opacity: 1 },
                                '&:hover img': { transform: 'scale(1.05)', filter: 'grayscale(0%) brightness(0.8)' },
                            }}
                        >
                            {/* Order badge */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 12, left: 12, zIndex: 2,
                                    width: 32, height: 32,
                                    background: 'rgba(192,57,43,0.9)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: "'Cinzel'", fontWeight: 700, fontSize: '0.85rem', color: '#fff',
                                }}
                            >
                                {index + 1}
                            </Box>

                            {/* Image */}
                            <Box sx={{ height: 180, overflow: 'hidden', background: '#0d0808', position: 'relative' }}>
                                {map.image_url ? (
                                    <Box
                                        component="img"
                                        src={proxyImg(map.image_url)}
                                        alt={map.name}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                        sx={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            filter: 'grayscale(60%) brightness(0.7) contrast(1.2)',
                                            transition: 'all 0.4s ease',
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <LocationOnIcon sx={{ fontSize: 60, color: '#1a1414' }} />
                                    </Box>
                                )}

                                {/* Hover overlay */}
                                <Box
                                    className="map-overlay"
                                    sx={{
                                        position: 'absolute', inset: 0,
                                        background: 'rgba(192,57,43,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        opacity: 0, transition: 'opacity 0.3s ease',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ color: '#fff', fontFamily: "'Cinzel'", letterSpacing: '0.15em' }}>
                                        VIEW
                                    </Typography>
                                </Box>
                            </Box>

                            <CardContent>
                                <Typography variant="h6" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0', fontSize: '0.95rem', mb: 0.5 }}>
                                    {map.name}
                                </Typography>
                                {map.area && (
                                    <Chip
                                        icon={<LocationOnIcon sx={{ fontSize: '14px !important', color: '#c0392b !important' }} />}
                                        label={map.area}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderColor: '#2c2020', color: '#8c7b68', mb: 1.5, fontFamily: "'Rajdhani'" }}
                                    />
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#8c7b68', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                >
                                    {map.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Location detail dialog */}
            <Dialog
                open={!!selected}
                onClose={() => setSelected(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { background: '#110f0f', border: '1px solid #2c2020', borderRadius: 0 } }}
            >
                {selected && (
                    <>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2c2020', pb: 2 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: '#c0392b', letterSpacing: '0.2em', display: 'block', lineHeight: 1 }}>
                                    Location #{selected.order_num}
                                </Typography>
                                <Typography variant="h5" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0', mt: 0.5 }}>
                                    {selected.name}
                                </Typography>
                            </Box>
                            <IconButton onClick={() => setSelected(null)} sx={{ color: '#8c7b68' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            {selected.image_url && (
                                <Box
                                    component="img"
                                    src={proxyImg(selected.image_url)}
                                    alt={selected.name}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                    sx={{
                                        width: '100%', maxHeight: 260, objectFit: 'contain', mb: 3,
                                        filter: 'contrast(1.1)',
                                        background: '#0d0808',
                                    }}
                                />
                            )}
                            {selected.area && (
                                <Chip
                                    icon={<LocationOnIcon sx={{ fontSize: '14px !important', color: '#c0392b !important' }} />}
                                    label={selected.area}
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderColor: '#c0392b', color: '#c0392b', mb: 2 }}
                                />
                            )}
                            <Typography variant="body1" sx={{ color: '#d4c5b0', lineHeight: 1.9 }}>
                                {selected.description}
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default Maps;
