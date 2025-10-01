import db from '../../models';
import { UserAttributes } from '../types/user';

export const getAllUsers = async () => {
  try {
    const users: UserAttributes[] = await db.User.findAll({
      order: [
        ['email', 'ASC'],
        ['username', 'ASC'],
      ],
    });

    return users;
  } catch (error: any) {
    throw error;
  };
};


export const setUserRole = async (id_user: number, role: 'admin' | 'user') => {
  try {
    const [changedUsers, newUser]: [number, UserAttributes[]] = await db.User.update({ role }, {
      where: { id: id_user },
      returning: true,
    });

    if (changedUsers === 0) {
      throw new Error('User does not exist.');
    };

    return newUser[0];
  } catch (error: any) {
    throw error;
  };
};

export const setActiveUser = async (id_user: number, active: boolean) => {
  try {
    const [changedUsers, newUser]: [number, UserAttributes[]] = await db.User.update({ active }, {
      where: { id: id_user },
      returning: true,
    });

    if (changedUsers === 0) {
      throw new Error('User does not exist.');
    };

    return newUser[0];
  } catch (error: any) {
    throw error;
  };
};