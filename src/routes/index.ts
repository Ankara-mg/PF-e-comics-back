const { Router } = require('express');
import routesCharacter from './router.characters'
import routerConcepts from './router.cocepts'
import routerPublishers from './router.publishers'
const router = Router();

router.use('/characters', routesCharacter )
router.use('/concepts', routerConcepts )
router.use('/publishers', routerPublishers)
export default router;