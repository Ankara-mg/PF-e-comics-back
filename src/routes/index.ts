const { Router } = require('express');
import routesCharacter from './router.characters'
const router = Router();

router.use('/characters', routesCharacter )

export default router;