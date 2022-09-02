const { Router } = require('express');
import routesCharacter from './router.characters'
import episodesRoutes from './episodesRoutes';
import routerConcepts from './router.concepts'
import routerPublishers from './router.publishers'
import issuesRoutes from './issuesRoutes'

const router = Router();

router.use('/characters', routesCharacter )
router.use('/comics', episodesRoutes)
router.use('/concepts', routerConcepts )
router.use('/publishers', routerPublishers)
router.use('/issues', issuesRoutes)

export default router;