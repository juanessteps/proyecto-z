import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails,
    CircularProgress, Alert, Divider, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLoreEntries } from '../api';
import CommentSection from '../components/CommentSection';

const Lore = () => {
    const [entries, setEntries] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getLoreEntries()
            .then(({ data }) => setEntries(data))
            .catch(() => setError('Failed to load lore entries'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    const chapters = [...new Set(entries.map(e => e.chapter || 'Lore'))];

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>Story Archive</Typography>
                <Typography variant="h3" sx={{ color: '#d4c5b0', mt: 0.5 }}>Lore</Typography>
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
                <Typography variant="body2" sx={{ color: '#8c7b68', mt: 2, fontStyle: 'italic' }}>
                    The truth behind the fog — if you dare to read it.
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {chapters.map((chapter) => (
                <Box key={chapter} sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ flex: 1, height: 1, background: '#2c2020' }} />
                        <Chip label={chapter} variant="outlined" sx={{ borderColor: '#c0392b', color: '#c0392b', fontFamily: "'Cinzel'", letterSpacing: '0.1em' }} />
                        <Box sx={{ flex: 1, height: 1, background: '#2c2020' }} />
                    </Box>

                    {entries.filter(e => (e.chapter || 'Lore') === chapter).map((entry) => (
                        <Accordion
                            key={entry.id}
                            expanded={expanded === entry.id}
                            onChange={() => setExpanded(expanded === entry.id ? false : entry.id)}
                            elevation={0}
                            sx={{
                                background: '#110f0f',
                                border: '1px solid',
                                borderColor: expanded === entry.id ? '#c0392b' : '#2c2020',
                                mb: 1,
                                borderRadius: '0 !important',
                                '&:before': { display: 'none' },
                                transition: 'border-color 0.3s',
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#c0392b' }} />}
                                sx={{ '&:hover': { background: 'rgba(192,57,43,0.05)' } }}
                            >
                                <Typography variant="h6" sx={{ fontFamily: "'Cinzel'", color: '#d4c5b0', fontSize: '1rem' }}>
                                    {entry.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ borderTop: '1px solid #2c2020' }}>
                                <Typography variant="body1" sx={{ color: '#d4c5b0', lineHeight: 1.9, mb: 3 }}>
                                    {entry.content}
                                </Typography>
                                <Divider sx={{ borderColor: '#2c2020', mb: 2 }} />
                                <CommentSection entity="lore_entries" entityId={entry.id} />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            ))}
        </Container>
    );
};

export default Lore;
