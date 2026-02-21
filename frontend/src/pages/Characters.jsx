import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea,
    Chip, Dialog, DialogContent, DialogTitle, IconButton, CircularProgress, Alert, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getCharacters, getComments, createComment, deleteComment } from '../api';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

const ROLE_COLORS = {
    Protagonist: 'error',
    Companion: 'warning',
    Supporting: 'default',
    Antagonist: 'error',
};

const Characters = () => {
    const { user } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getCharacters()
            .then(({ data }) => setCharacters(data))
            .catch(() => setError('Failed to load characters'))
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
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>Toluca Lake</Typography>
                <Typography variant="h3" sx={{ color: '#d4c5b0', mt: 0.5 }}>Characters</Typography>
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={3}>
                {characters.map((char) => (
                    <Grid item xs={12} sm={6} md={4} key={char.id}>
                        <Card elevation={0}>
                            <CardActionArea onClick={() => setSelected(char)}>
                                {char.image_url && (
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={char.image_url}
                                        alt={char.name}
                                        sx={{ objectFit: 'cover', filter: 'grayscale(40%) contrast(1.1)', transition: 'filter 0.3s', '&:hover': { filter: 'grayscale(0%) contrast(1.2)' } }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                )}
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0' }}>
                                            {char.name}
                                        </Typography>
                                        {char.role_type && (
                                            <Chip
                                                label={char.role_type}
                                                size="small"
                                                color={ROLE_COLORS[char.role_type] || 'default'}
                                                variant="outlined"
                                                sx={{ ml: 1, flexShrink: 0 }}
                                            />
                                        )}
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#8c7b68', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {char.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Character Detail Dialog */}
            <Dialog
                open={!!selected}
                onClose={() => setSelected(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{ sx: { background: '#110f0f', border: '1px solid #2c2020', borderRadius: 0 } }}
            >
                {selected && (
                    <>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2c2020' }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0' }}>{selected.name}</Typography>
                                {selected.role_type && <Chip label={selected.role_type} size="small" color="error" variant="outlined" sx={{ mt: 0.5 }} />}
                            </Box>
                            <IconButton onClick={() => setSelected(null)} sx={{ color: '#8c7b68' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            {selected.image_url && (
                                <Box
                                    component="img"
                                    src={selected.image_url}
                                    alt={selected.name}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                    sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', mb: 3, filter: 'contrast(1.1)' }}
                                />
                            )}
                            <Typography variant="body1" sx={{ color: '#d4c5b0', lineHeight: 1.8, mb: 4 }}>
                                {selected.description}
                            </Typography>
                            <Divider sx={{ borderColor: '#2c2020', mb: 3 }} />
                            <CommentSection entity="characters" entityId={selected.id} />
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default Characters;
