import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box, Container, Typography, TextField, Button, Alert, CircularProgress, Divider
} from '@mui/material';
import { login as loginApi } from '../api';
import { useAuth } from '../context/AuthContext';
import GlitchText from '../components/GlitchText';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await loginApi(form);
            login(data);
            navigate(data.user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
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
                        text="ENTER"
                        component="h2"
                        sx={{ fontSize: '3rem', display: 'block', mt: 1, mb: 0.5 }}
                    />
                    <Typography variant="body2" sx={{ color: '#8c7b68', fontStyle: 'italic' }}>
                        "The fog is waiting for you..."
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
                        label="Email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        fullWidth required autoComplete="email"
                    />
                    <TextField
                        label="Password" name="password" type="password"
                        value={form.password} onChange={handleChange}
                        fullWidth required autoComplete="current-password"
                    />

                    <Button type="submit" variant="contained" color="primary" size="large"
                        disabled={loading} fullWidth sx={{ mt: 1, py: 1.5 }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Enter Silent Hill'}
                    </Button>

                    <Divider sx={{ borderColor: '#2c2020' }} />
                    <Typography variant="body2" align="center" sx={{ color: '#8c7b68' }}>
                        No account?{' '}
                        <RouterLink to="/register" style={{ color: '#c0392b', textDecoration: 'none' }}>
                            Register
                        </RouterLink>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
