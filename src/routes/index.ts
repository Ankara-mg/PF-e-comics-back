const { Router } = require('express');
require('dotenv').config()
import routesCharacter from './router.characters'
import episodesRoutes from './episodesRoutes';
import routerConcepts from './router.concepts'
import routerPublishers from './router.publishers'
import routerUsers from './router.Users'
import routerAdmin from './router.admin';
import routerCheckout from './checkout.routes';
import routerFavs from './routerFavorite'
import routerRating from './router.ratings'


const router = Router();


router.use('/characters', routesCharacter)
router.use('/comics', episodesRoutes)
router.use('/concepts', routerConcepts)
router.use('/publishers', routerPublishers)
router.use('/user', routerUsers)
router.use('/checkout', routerCheckout)
router.use('/ratings', routerRating)
router.use('/fav', routerFavs)
router.use('/admin', routerAdmin)


export default router;