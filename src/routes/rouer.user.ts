const { Router } = require('express');
import { postUser} from '../controller/controller.user'
const router = Router();

router.post('/', postUser)


export default router;