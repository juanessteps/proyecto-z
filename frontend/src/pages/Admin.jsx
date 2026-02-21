import { useState, useEffect, useCallback } from 'react';
import {
    Box, Container, Typography, Tabs, Tab, Button, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions, IconButton, Table, TableBody, TableCell, TableHead,
    TableRow, CircularProgress, Alert, Chip, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getCharacters, createCharacter, updateCharacter, deleteCharacter,
    getLoreEntries, createLore, updateLore, deleteLore,
    getItems, createItem, updateItem, deleteItem,
    getTips, createTip, updateTip, deleteTip,
} from '../api';
import GlitchText from '../components/GlitchText';

// Generic CRUD table panel
const ResourcePanel = ({ columns, rows, onAdd, onEdit, onDelete }) => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={onAdd}>Add New</Button>
        </Box>
        {rows.length === 0 ? (
            <Typography sx={{ color: '#3d3030', py: 4, textAlign: 'center' }}>No entries yet.</Typography>
        ) : (
            <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ '& th': { color: '#8c7b68', fontFamily: "'Cinzel'", borderColor: '#2c2020' }, '& td': { borderColor: '#1a1414', color: '#d4c5b0' } }}>
                    <TableHead>
                        <TableRow>
                            {columns.map(c => <TableCell key={c.key}>{c.label}</TableCell>)}
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id} sx={{ '&:hover': { background: 'rgba(192,57,43,0.04)' } }}>
                                {columns.map(c => (
                                    <TableCell key={c.key} sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {c.render ? c.render(row[c.key]) : row[c.key]}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: '#8c7b68', mr: 1 }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => onDelete(row.id)} sx={{ color: '#c0392b' }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        )}
    </Box>
);

// ─── Field definitions per resource ───────────────────────────────────────────
const RESOURCE_CONFIG = {
    characters: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'role_type', label: 'Role' },
            { key: 'description', label: 'Description' },
        ],
        fields: [
            { key: 'name', label: 'Name *', required: true },
            { key: 'role_type', label: 'Role Type' },
            { key: 'image_url', label: 'Image URL' },
            { key: 'description', label: 'Description', multiline: true },
        ],
        api: { getAll: getCharacters, create: createCharacter, update: updateCharacter, remove: deleteCharacter },
    },
    lore: {
        columns: [
            { key: 'title', label: 'Title' },
            { key: 'chapter', label: 'Chapter' },
        ],
        fields: [
            { key: 'title', label: 'Title *', required: true },
            { key: 'chapter', label: 'Chapter' },
            { key: 'content', label: 'Content *', required: true, multiline: true },
        ],
        api: { getAll: getLoreEntries, create: createLore, update: updateLore, remove: deleteLore },
    },
    items: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Type', render: (v) => <Chip label={v} size="small" variant="outlined" /> },
        ],
        fields: [
            { key: 'name', label: 'Name *', required: true },
            { key: 'type', label: 'Type *', required: true, select: ['weapon', 'health', 'key', 'ammo', 'other'] },
            { key: 'description', label: 'Description', multiline: true },
            { key: 'image_url', label: 'Image URL' },
        ],
        api: { getAll: getItems, create: createItem, update: updateItem, remove: deleteItem },
    },
    tips: {
        columns: [
            { key: 'title', label: 'Title' },
            { key: 'difficulty', label: 'Difficulty', render: (v) => <Chip label={v} size="small" color={v === 'hard' ? 'error' : v === 'medium' ? 'warning' : 'success'} variant="outlined" /> },
        ],
        fields: [
            { key: 'title', label: 'Title *', required: true },
            { key: 'difficulty', label: 'Difficulty', select: ['easy', 'medium', 'hard'] },
            { key: 'content', label: 'Content *', required: true, multiline: true },
        ],
        api: { getAll: getTips, create: createTip, update: updateTip, remove: deleteTip },
    },
};

const TABS = ['characters', 'lore', 'items', 'tips'];

// ─── Generic dialog ────────────────────────────────────────────────────────────
const ResourceDialog = ({ open, onClose, fields, initial, onSave, title }) => {
    const [form, setForm] = useState(initial || {});
    useEffect(() => setForm(initial || {}), [initial]);

    const handleSave = () => onSave(form);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            PaperProps={{ sx: { background: '#110f0f', border: '1px solid #2c2020', borderRadius: 0 } }}>
            <DialogTitle sx={{ borderBottom: '1px solid #2c2020', fontFamily: "'Cinzel'", color: '#d4c5b0' }}>
                {title}
            </DialogTitle>
            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {fields.map(f => f.select ? (
                    <FormControl key={f.key} fullWidth size="small">
                        <InputLabel sx={{ color: '#8c7b68' }}>{f.label}</InputLabel>
                        <Select
                            value={form[f.key] || ''}
                            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                            label={f.label}
                            sx={{ borderRadius: 0, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2c2020' } }}
                        >
                            {f.select.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                        </Select>
                    </FormControl>
                ) : (
                    <TextField
                        key={f.key}
                        label={f.label}
                        value={form[f.key] || ''}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        fullWidth
                        size="small"
                        multiline={f.multiline}
                        minRows={f.multiline ? 3 : undefined}
                        required={f.required}
                    />
                ))}
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #2c2020', p: 2 }}>
                <Button onClick={onClose} sx={{ color: '#8c7b68' }}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

// ─── Admin page ──────────────────────────────────────────────────────────────
const Admin = () => {
    const [tab, setTab] = useState(0);
    const [data, setData] = useState({ characters: [], lore: [], items: [], tips: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState({ open: false, mode: 'add', initial: null });

    const resource = TABS[tab];
    const config = RESOURCE_CONFIG[resource];

    const loadAll = useCallback(async () => {
        setLoading(true);
        try {
            const [chars, lore, items, tips] = await Promise.all([
                getCharacters(), getLoreEntries(), getItems(), getTips()
            ]);
            setData({ characters: chars.data, lore: lore.data, items: items.data, tips: tips.data });
        } catch { setError('Failed to load data'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { loadAll(); }, [loadAll]);

    const handleSave = async (form) => {
        try {
            if (dialog.mode === 'add') {
                await config.api.create(form);
            } else {
                await config.api.update(dialog.initial.id, form);
            }
            setDialog({ open: false, mode: 'add', initial: null });
            loadAll();
        } catch { setError('Save failed'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return;
        try {
            await config.api.remove(id);
            loadAll();
        } catch { setError('Delete failed'); }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#8c7b68', letterSpacing: '0.3em' }}>Administrator</Typography>
                <GlitchText text="DASHBOARD" component="h2" sx={{ fontSize: '3rem', display: 'block', mt: 1 }} />
                <Box sx={{ width: 60, height: 2, background: '#c0392b', mx: 'auto', mt: 2 }} />
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                TabIndicatorProps={{ sx: { background: '#c0392b', height: 2 } }}
                sx={{
                    mb: 3,
                    borderBottom: '1px solid #2c2020',
                    '& .MuiTab-root': { color: '#8c7b68', fontFamily: "'Cinzel'", textTransform: 'uppercase', letterSpacing: '0.1em' },
                    '& .Mui-selected': { color: '#c0392b !important' },
                }}
            >
                <Tab label="Characters" />
                <Tab label="Lore" />
                <Tab label="Items" />
                <Tab label="Tips" />
            </Tabs>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <ResourcePanel
                    columns={config.columns}
                    rows={data[resource]}
                    onAdd={() => setDialog({ open: true, mode: 'add', initial: null })}
                    onEdit={(row) => setDialog({ open: true, mode: 'edit', initial: row })}
                    onDelete={handleDelete}
                />
            )}

            <ResourceDialog
                open={dialog.open}
                onClose={() => setDialog({ open: false, mode: 'add', initial: null })}
                fields={config.fields}
                initial={dialog.initial}
                onSave={handleSave}
                title={`${dialog.mode === 'add' ? 'Add' : 'Edit'} ${resource}`}
            />
        </Container>
    );
};

export default Admin;
