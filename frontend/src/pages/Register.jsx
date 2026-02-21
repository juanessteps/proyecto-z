import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box, Container, Typography, TextField, Button, Alert, CircularProgress, Divider
} from '@mui/material';
import { register as registerApi } from '../api';
import { useAuth } from '../context/AuthContext';
import GlitchText from '../components/GlitchText';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }
        setLoading(true);
        try {
            const { data } = await registerApi(form);
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,57,43,0.08) 0%, transparent 60%)',
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>
                        Fan Portal
                    </Typography>
                    <GlitchText
                        text="JOIN THE FOG"
                        component="h2"
                        sx={{ fontSize: '2.5rem', display: 'block', mt: 1, mb: 0.5 }}
                    />
                    <Typography variant="body2" sx={{ color: '#8c7b68', fontStyle: 'italic' }}>
                        "Not everyone who enters returns..."
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 4,
                        background: '#110f0f',
                        border: '1px solid #2c2020',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                    }}
                >
                    {error && <Alert severity="error" sx={{ borderRadius: 0 }}>{error}</Alert>}

                    <TextField
                        label="Username" name="username"
                        value={form.username} onChange={handleChange}
                        fullWidth required autoComplete="username"
                    />
                    <TextField
                        label="Email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        fullWidth required autoComplete="email"
                    />
                    <TextField
                        label="Password" name="password" type="password"
                        value={form.password} onChange={handleChange}
                        fullWidth required autoComplete="new-password"
                        helperText="Minimum 6 characters"
                        FormHelperTextProps={{ sx: { color: '#8c7b68' } }}
                    />

                    <Button type="submit" variant="contained" color="primary" size="large"
                        disabled={loading} fullWidth sx={{ mt: 1, py: 1.5 }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                    </Button>

                    <Divider sx={{ borderColor: '#2c2020' }} />
                    <Typography variant="body2" align="center" sx={{ color: '#8c7b68' }}>
                        Already a wanderer?{' '}
                        <RouterLink to="/login" style={{ color: '#c0392b', textDecoration: 'none' }}>
                            Login
                        </RouterLink>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;
