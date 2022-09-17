// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
const { Router } = require('express');
//import issuesRoutes from './issuesRoutes'
require('dotenv').config()
//const {SESSION_SECRET, BASE_URL, AUTH0_CLIENT_ID, AUTH0_ISSUER_BASE_URL} = process.env 
import routesCharacter from './router.characters'
import episodesRoutes from './episodesRoutes';
import routerConcepts from './router.concepts'
import routerPublishers from './router.publishers'
import routerUsers from './router.Users'
import routerCheckout from './checkout.routes';
import routerRating from './ratingsRoute'

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

const router = Router();

// router.use(auth(config));

// router.get('/', (req: { oidc: { isAuthenticated: () => any; }; }, res: { send: (arg0: string) => void; }) => {
// res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

router.use('/characters', routesCharacter)
router.use('/comics', episodesRoutes)
router.use('/concepts', routerConcepts)
router.use('/publishers', routerPublishers)
router.use('/user', routerUsers)
router.use('/checkout', routerCheckout)
router.use('/ratings', routerRating)
//router.use('/issues', issuesRoutes)

// router.get('/sign-up', (req: any, res: { oidc: { login: (arg0: { authorizationParams: { screen_hint: string; }; }) => void; }; }) => {
//   res.oidc.login({
//     authorizationParams: {
//       screen_hint: 'signup',
//     },
//   });
// });

// router.get('/logout', (req: any, res: { oidc: { logout: (arg0: { returnTo: string; }) => void; }; }) => {
//   res.oidc.logout({ returnTo: '' })
// });
export default router;