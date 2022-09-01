const { Router } = require('express');
import routesCharacter from './router.characters'
//import detailsRoutes from './detailsRoutes'
import episodesRoutes from './episodesRoutes';
const router = Router();

router.use('/characters', routesCharacter )
router.use('/comics', episodesRoutes)
//router.use('/comics/:id', detailsRoutes)

export default router;