const { Router } = require('express');
import routesCharacter from './router.characters'
import episodesRoutes from './episodesRoutes';
const router = Router();

router.use('/characters', routesCharacter )
router.use('/comics', episodesRoutes)

export default router;