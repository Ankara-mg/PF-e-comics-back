const { Router } = require('express');
import { getConcepts } from "../controller/controller.concepts";

const router = Router();

router.get('/', getConcepts )


export default router;