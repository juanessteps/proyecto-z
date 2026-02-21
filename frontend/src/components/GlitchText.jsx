import { Box } from '@mui/material';

/**
 * Renders text with a CSS glitch flicker effect.
 * Props: text (string), variant ('h1'|'h2'|etc) via sx, any sx overrides
 */
const GlitchText = ({ text, sx = {}, component = 'h1' }) => (
    <Box
        component={component}
        sx={{
            position: 'relative',
            display: 'inline-block',
            fontFamily: "'Cinzel', serif",
            color: '#d4c5b0',
            margin: 0,
            animation: 'glitchFlicker 8s infinite',
            '&::before, &::after': {
                content: `"${text}"`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
            },
            '&::before': {
                color: '#c0392b',
                animation: 'glitchBefore 8s infinite',
                clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)',
            },
            '&::after': {
                color: '#e67e22',
                animation: 'glitchAfter 8s infinite',
                clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)',
            },
            '@keyframes glitchFlicker': {
                '0%, 90%, 100%': { opacity: 1 },
                '92%': { opacity: 0.8 },
                '94%': { opacity: 1 },
                '96%': { opacity: 0.6 },
                '98%': { opacity: 1 },
            },
            '@keyframes glitchBefore': {
                '0%, 89%, 100%': { opacity: 0, transform: 'none' },
                '90%': { opacity: 1, transform: 'translate(-2px, 1px)' },
                '91%': { opacity: 0 },
                '95%': { opacity: 0.8, transform: 'translate(2px, -1px)' },
                '96%': { opacity: 0 },
            },
            '@keyframes glitchAfter': {
                '0%, 93%, 100%': { opacity: 0, transform: 'none' },
                '94%': { opacity: 1, transform: 'translate(2px, 1px)' },
                '95%': { opacity: 0 },
                '97%': { opacity: 0.7, transform: 'translate(-2px, -1px)' },
                '98%': { opacity: 0 },
            },
            ...sx,
        }}
    >
        {text}
    </Box>
);

export default GlitchText;
