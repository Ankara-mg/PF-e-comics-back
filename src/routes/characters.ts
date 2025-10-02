import { Request, Response, Router } from 'express';
import { CharacterAttributes } from '@custom-types/character';
import { getCharacters } from '../controller/characterController';

const characterRoutes = Router();

characterRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const characters: CharacterAttributes[] = await getCharacters();
    res.status(200).send(characters);
  } catch (error: any) {
    res.status(500).send(error);
  };
});

export default characterRoutes;