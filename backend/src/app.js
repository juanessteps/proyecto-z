require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const characterRoutes = require('./routes/characters');
const loreRoutes = require('./routes/lore');
const itemRoutes = require('./routes/items');
const tipRoutes = require('./routes/tips');
const mapRoutes = require('./routes/maps');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

// ── Routes (all public, all static data) ─────────────────
app.use('/api/characters', characterRoutes);
app.use('/api/lore', loreRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/maps', mapRoutes);

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        project: 'Silent Hill 2 Fan Portal',
        mode: 'static (no database required)',
    });
});

// ── 404 ───────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`\n🌫️  Silent Hill 2 API  →  http://localhost:${PORT}`);
    console.log(`✅  Static mode: no database required\n`);
});

module.exports = app;
