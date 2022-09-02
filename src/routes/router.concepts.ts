const { Router } = require('express');
import { getConceptssDB } from "../controller/controller.concepts";

const router = Router();

router.get('/', getConceptssDB )


export default router;