import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models';

const { SESSION_SECRET_USER, SESSION_SECRET_ADMIN } = process.env;

export const createUser = async (username: string, email: string, password: string) => {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      email: email.toLowerCase(),
      active: true,
    });

    return newUser;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await db.User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) throw new Error('User not found');

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw new Error('Incorrect password');

    if (!SESSION_SECRET_ADMIN || !SESSION_SECRET_USER) throw new Error('Missing JWT secrets.');

    let token: string = jwt.sign({ id: user.id }, user.role == 'admin' ? SESSION_SECRET_ADMIN : SESSION_SECRET_USER, { expiresIn: '1d' });
    return { auth: true, token, role: user.role, name: user.username, id: user.id, email: user.email };
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const loginUserGoogle = async (googleToken: string) => {
  const authClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (!SESSION_SECRET_ADMIN || !SESSION_SECRET_USER) throw new Error('Missing JWT secrets.');

  try {
    const ticket = await authClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) throw new Error('Google token is missing email.');

    const user = await db.User.findOne({
      where: { email: payload.email }
    });

    if (!user) throw new Error('User does not exist.');

    const secret = user.role === 'admin' ? SESSION_SECRET_ADMIN : SESSION_SECRET_USER;
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });

    return { auth: true, token, role: user.role, name: user.username, id: user.id, email: user.email };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  };
};
