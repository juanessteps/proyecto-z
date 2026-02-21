import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Lore from './pages/Lore';
import Characters from './pages/Characters';
import Items from './pages/Items';
import Tips from './pages/Tips';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/lore" element={<Lore />} />
                        <Route path="/characters" element={<Characters />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/tips" element={<Tips />} />
                        <Route path="/admin" element={
                            <ProtectedRoute role="admin">
                                <Admin />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
);

export default App;
