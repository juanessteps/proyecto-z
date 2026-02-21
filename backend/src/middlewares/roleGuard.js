/**
 * Factory that returns a middleware restricting access to specific roles.
 * Usage: roleGuard('admin') or roleGuard('admin','cliente')
 */
const roleGuard = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
        }
        next();
    };
};

module.exports = roleGuard;
