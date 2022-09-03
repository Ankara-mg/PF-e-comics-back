const { Router } = require('express');
import { getpublishersDB } from "../controller/controller.publishers";


const router = Router();

router.get('/', getpublishersDB )
            
            
export default router;