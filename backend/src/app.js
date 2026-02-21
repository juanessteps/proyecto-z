require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const https = require('https');
const http = require('http');

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

// ── Root Route ──────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({
        message: 'Silent Hill 2 Fan Portal API is running',
        endpoints: [
            '/api/characters',
            '/api/lore',
            '/api/items',
            '/api/tips',
            '/api/maps',
            '/api/health'
        ]
    });
});

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        project: 'Silent Hill 2 Fan Portal',
        mode: 'static (no database required)',
    });
});

// ── Image proxy (bypasses CDN hotlink protection) ────────
app.get('/api/img', (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send('Missing url param');

    let referer = 'https://silenthill.fandom.com/';
    if (url.includes('silenthillmemories.net')) {
        referer = 'https://www.silenthillmemories.net/';
    }

    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;

    const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: {
            'Referer': referer,
            'User-Agent': 'Mozilla/5.0 (compatible; SH2FanPortal/1.0)',
        },
    };

    lib.get(options, (upstream) => {
        res.set('Content-Type', upstream.headers['content-type'] || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=86400');
        upstream.pipe(res);
    }).on('error', () => res.status(502).send('Image fetch failed'));
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
