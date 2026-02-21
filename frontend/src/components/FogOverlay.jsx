import { Box } from '@mui/material';

const FogOverlay = () => (
    <Box
        sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,57,43,0.06) 0%, transparent 70%)',
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          radial-gradient(ellipse 60% 40% at 20% 50%, rgba(100,20,10,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(100,20,10,0.06) 0%, transparent 60%)
        `,
                animation: 'fogDrift 20s ease-in-out infinite alternate',
            },
            '@keyframes fogDrift': {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '50%': { transform: 'translate(10px, -8px) scale(1.02)' },
                '100%': { transform: 'translate(-8px, 5px) scale(0.99)' },
            },
        }}
    />
);

export default FogOverlay;
