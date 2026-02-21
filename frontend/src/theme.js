import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#080808',
            paper: '#110f0f',
        },
        primary: {
            main: '#c0392b',
            light: '#e74c3c',
            dark: '#922b21',
        },
        secondary: {
            main: '#e67e22',
            light: '#f39c12',
        },
        text: {
            primary: '#d4c5b0',
            secondary: '#8c7b68',
        },
        divider: '#2c2020',
        error: { main: '#e74c3c' },
        warning: { main: '#f39c12' },
        success: { main: '#27ae60' },
    },
    typography: {
        fontFamily: "'Rajdhani', sans-serif",
        h1: { fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: '0.05em' },
        h2: { fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: '0.04em' },
        h3: { fontFamily: "'Cinzel', serif", fontWeight: 600 },
        h4: { fontFamily: "'Cinzel', serif", fontWeight: 500 },
        h5: { fontFamily: "'Cinzel', serif" },
        h6: { fontFamily: "'Cinzel', serif" },
        button: { fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: '0.1em' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#080808',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#c0392b #110f0f',
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { background: '#110f0f' },
                    '&::-webkit-scrollbar-thumb': { background: '#c0392b', borderRadius: '3px' },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    transition: 'all 0.3s ease',
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #c0392b 0%, #922b21 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                        boxShadow: '0 0 20px rgba(192,57,43,0.5)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: '#110f0f',
                    border: '1px solid #2c2020',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        border: '1px solid #c0392b',
                        boxShadow: '0 0 20px rgba(192,57,43,0.15)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                        '& fieldset': { borderColor: '#2c2020' },
                        '&:hover fieldset': { borderColor: '#c0392b' },
                        '&.Mui-focused fieldset': { borderColor: '#c0392b' },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { borderRadius: 0, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'rgba(8,8,8,0.92)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #2c2020',
                },
            },
        },
    },
    shape: { borderRadius: 0 },
});

export default theme;
