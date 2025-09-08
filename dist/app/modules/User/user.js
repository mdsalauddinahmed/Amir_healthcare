import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.send({
        message: 'Route is working perfectly'
    });
});
const userRoutes = router;
export default userRoutes;
//# sourceMappingURL=user.js.map