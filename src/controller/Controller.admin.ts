import axios from "axios"
import db from "../../models";
import { Op } from 'sequelize'
require('dotenv').config();
const apiKey = process.env.API_KEY


//----------------------------- http://localhost:3000/comics -----------------------------------

export const users_db = async () => {
  const allcomicsDB = await db.Users.findAll({
    order: [
      ['email', 'ASC'],
      ['username', 'ASC'],
    ],
  });
  if (allcomicsDB && allcomicsDB.length > 0) {
    return allcomicsDB
  } else {
    throw new Error("No users in DB");
  }
}

export const setRolUser = async (id_user: number, rol: string) => {

  await db.Users.update({ rol: rol }, {
    where: {
      id: id_user
    }
  });

  const getUser = await db.Users.findAll({
    where: {
      id: id_user
    }
  });

  if (getUser && getUser.length > 0) {
    return getUser
  } else {
    throw new Error("No users in DB");
  }
}
export const setActiveUser = async (id_user: number, active: boolean) => {

  await db.Users.update({ active: active }, {
    where: {
      id: id_user
    }
  });

  const getUser = await db.Users.findAll({
    where: {
      id: id_user
    }
  });

  if (getUser && getUser.length > 0) {
    return getUser
  } else {
    throw new Error("No users in DB");
  }
}
