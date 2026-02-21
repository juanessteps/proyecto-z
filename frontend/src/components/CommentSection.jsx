import { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, TextField, Button, CircularProgress,
    List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getComments, createComment, deleteComment } from '../api';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ entity, entityId }) => {
    const { user, isAdmin } = useAuth();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const load = useCallback(() => {
        setLoading(true);
        getComments(entity, entityId)
            .then(({ data }) => setComments(data))
            .catch(() => setError('Failed to load comments'))
            .finally(() => setLoading(false));
    }, [entity, entityId]);

    useEffect(() => { load(); }, [load]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        setSubmitting(true);
        try {
            await createComment({ entity_type: entity, entity_id: entityId, content });
            setContent('');
            load();
        } catch {
            setError('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            setComments(c => c.filter(x => x.id !== id));
        } catch {
            setError('Failed to delete comment');
        }
    };

    return (
        <Box>
            <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.2em', mb: 1, display: 'block' }}>
                Comments ({comments.length})
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 1, borderRadius: 0 }} onClose={() => setError('')}>{error}</Alert>}

            {loading ? (
                <CircularProgress size={20} color="primary" />
            ) : (
                <List dense sx={{ mb: 2 }}>
                    {comments.map((c, i) => (
                        <Box key={c.id}>
                            <ListItem disablePadding sx={{ py: 1 }}>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                                            <Typography variant="body2" sx={{ color: '#c0392b', fontWeight: 600 }}>{c.username}</Typography>
                                            <Typography variant="caption" sx={{ color: '#3d3030' }}>
                                                {new Date(c.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={<Typography variant="body2" sx={{ color: '#8c7b68', mt: 0.5 }}>{c.content}</Typography>}
                                />
                                {(user?.id === c.user_id || isAdmin) && (
                                    <ListItemSecondaryAction>
                                        <IconButton size="small" onClick={() => handleDelete(c.id)} sx={{ color: '#3d3030', '&:hover': { color: '#c0392b' } }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                )}
                            </ListItem>
                            {i < comments.length - 1 && <Divider sx={{ borderColor: '#1a1414' }} />}
                        </Box>
                    ))}
                    {comments.length === 0 && (
                        <Typography variant="body2" sx={{ color: '#3d3030', py: 1, fontStyle: 'italic' }}>
                            No comments yet. Be the first.
                        </Typography>
                    )}
                </List>
            )}

            {user ? (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <TextField
                        placeholder="Leave a comment..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        multiline
                        minRows={2}
                        fullWidth
                        size="small"
                        sx={{ flex: 1 }}
                    />
                    <Button type="submit" variant="outlined" color="primary" disabled={submitting} sx={{ mt: 0.5, whiteSpace: 'nowrap' }}>
                        {submitting ? <CircularProgress size={18} /> : 'Post'}
                    </Button>
                </Box>
            ) : (
                <Typography variant="body2" sx={{ color: '#3d3030', fontStyle: 'italic' }}>
                    <a href="/login" style={{ color: '#c0392b', textDecoration: 'none' }}>Login</a> to leave a comment.
                </Typography>
            )}
        </Box>
    );
};

export default CommentSection;
