import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Maps from './pages/Maps';
import Lore from './pages/Lore';
import Characters from './pages/Characters';
import Items from './pages/Items';
import Tips from './pages/Tips';
import NotFound from './pages/NotFound';

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <Navbar />
            <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/lore" element={<Lore />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/items" element={<Items />} />
                    <Route path="/tips" element={<Tips />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
