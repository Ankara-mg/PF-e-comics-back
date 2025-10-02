import { Request, Response, Router } from 'express';
import { PublisherAttributes } from '@custom-types/publisher';
import { getPublishers } from '../controller/publisherController';

const publisherRoutes = Router();

publisherRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const publishers: PublisherAttributes[] = await getPublishers();
    res.status(200).send(publishers);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  };
});

export default publisherRoutes;