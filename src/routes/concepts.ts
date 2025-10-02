import { Request, Response, Router } from 'express';
import { ConceptAttributes } from '@custom-types/concepts';
import { getConcepts } from '../controller/conceptController';

const conceptRoutes = Router();

conceptRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const concepts: ConceptAttributes[] = await getConcepts();
    res.status(200).send(concepts);
  } catch (error: any) {
    res.status(500).send(error);
  };
});

export default conceptRoutes;