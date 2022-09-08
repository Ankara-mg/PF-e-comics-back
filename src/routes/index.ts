const { Router } = require('express');
require('dotenv').config()
import routesCharacter from './router.characters'
import episodesRoutes from './episodesRoutes';
import routerConcepts from './router.concepts'
import routerPublishers from './router.publishers'
import routerUsers from './router.Users'
import routerCheckout from './checkout.routes';


const router = Router();

router.use('/characters', routesCharacter)
router.use('/comics', episodesRoutes)
router.use('/concepts', routerConcepts)
router.use('/publishers', routerPublishers)
router.use('/user', routerUsers)
router.use('/checkout', routerCheckout)

export default router;