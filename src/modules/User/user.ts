import express from 'express';

const router = express.Router();

// User routes will be defined here
router.get('/', (req, res) => {
    res.json({ message: 'User routes are working' });
});

export default router;
