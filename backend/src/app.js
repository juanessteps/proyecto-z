require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characters');
const loreRoutes = require('./routes/lore');
const itemRoutes = require('./routes/items');
const tipRoutes = require('./routes/tips');
const commentRoutes = require('./routes/comments');
const mapRoutes = require('./routes/maps');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/lore', loreRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/maps', mapRoutes);

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', project: 'Silent Hill 2 Fan Portal' });
});

// ── 404 handler ───────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`\n🌫️  Silent Hill 2 API running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
