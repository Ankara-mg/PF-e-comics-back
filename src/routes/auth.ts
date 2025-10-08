import { Request, Response, Router } from 'express';
import { loginUserGoogle, createUser, loginUser } from '../controller/authController';

const authRoutes = Router()

authRoutes.post('/login/google', async (req: Request, res: Response) => {
  const { google_token } = req.params;

  try {
    const authObj = await loginUserGoogle(google_token);
    res.status(200).send(authObj);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

authRoutes.post('/signup', async (req: Request<{ username: string, email: string, password: string }>, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await createUser(username, email, password);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  };
});

authRoutes.post('/login', async (req: Request<{ email: string, password: string }>, res: Response) => {
  const { email, password } = req.body;
  try {
    const authObj = await loginUser(email, password);
    res.status(200).send(authObj);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  };
});

export default authRoutes;
