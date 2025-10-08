import { Router } from 'express';

import characterRoutes from './characters';
import comicsRoutes from './comics';
import conceptRoutes from './concepts';
import publisherRoutes from './publishers';
import authRoutes from './auth';
import userRoutes from './users';
import adminRoutes from './admin';
import paymentRoutes from './checkout';

const router = Router();

router.use('/characters', characterRoutes);
router.use('/comics', comicsRoutes);
router.use('/concepts', conceptRoutes);
router.use('/publishers', publisherRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/shop', paymentRoutes);

export default router;